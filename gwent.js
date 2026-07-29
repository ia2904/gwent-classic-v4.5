"use strict"

class Controller { }

var nilfgaard_wins_draws = false;

// Makes decisions for the AI opponent player
class ControllerAI {
    constructor(player) {
        this.player = player;
    }

    // Computes the weights of the given cards
    getWeights(cards) {
        let data_max = this.getMaximums();
        let data_board = this.getBoardData();
        return cards.map(c =>
        ({
            weight: this.weightCard(c, data_max, data_board),
            card: c
        }));
    }

    // Return the card among the provided list having the highest weight
    getHighestWeightCard(cards) {
        let w = this.getWeights(cards).sort((a, b) => (b.weight - a.weight));
        if (w.length > 0) {
            return w[0].card;
        } 
        return null;
    }

    // Return the card among the provided list having the lowest weight
    getLowestWeightCard(cards) {
        let w = this.getWeights(cards).sort((a, b) => (a.weight - b.weight));
        if (w.length > 0) {
            return w[0].card;
        }
        return null;
    }

    // Collects data and weighs options before taking a weighted random action
    async startTurn(player) {
        let data_max = this.getMaximums();
        let data_board = this.getBoardData();
        // In case of a forced action, play it if positive weight, pass otherwise
        if (player.forcedActions.length > 0) {
            let card = player.forcedActions.splice(0, 1)[0];
            let w = this.weightCard(card, data_max, data_board);
            if (w > 0) {
                await this.playCard(card, data_max, data_board)
            } else {
                await player.passRound();
            }
            return;
        }
        if (player.opponent().passed && (player.winning || player.deck.faction === "nilfgaard" && player.total === player.opponent().total)) {
            nilfgaard_wins_draws = player.deck.faction === "nilfgaard" && player.total === player.opponent().total;
            await player.passRound();
            return;
        }
        
        let weights = player.hand.cards.map(c =>
        ({
            weight: this.weightCard(c, data_max, data_board),
            action: async () => await this.playCard(c, data_max, data_board),
            card: c
        }));

        // If the opponent has passed and is not too far ahead, let's try to take the win
        let diff = player.opponent().total - player.total;
        if (player.opponent().passed && diff < 16) {
            // Looking for a one shot that isn't overkill
            let oneshot = weights.filter(w => (w.card.basePower > diff && w.card.basePower < diff + 5) || (w.weight > diff && w.weight > diff + 5));
            if (oneshot.length > 0) {
                let oneshot_card = oneshot.sort((a, b) => (a.weight - b.weight))[0];
                await oneshot_card.action();
                return;
            }
            // Can we catch up in 2 plays?
            let playable = weights.filter(w => w.weight > 0).sort((a, b) => (b.weight - a.weight));
            if (playable.length > 2)
                playable = playable.slice(0, 2);
            let weightTotal = playable.reduce((a, c) => a + c.weight, 0);
            if (weightTotal > diff) {
                await playable[0].action();
                return;
            }
        }
        if (player.leaderAvailable)
            weights.push({
                name: "Leader Ability",
                weight: this.weightLeader(player.leader, data_max, data_board),
                action: async () => {
                    await ui.notification("op-leader", 1200);
                    await player.activateLeader();
                }
            });
        if (player.factionAbilityUses > 0) {
            let factionAbility = factions[player.deck.faction];
            weights.push({
                name: "Faction ability",
                weight: factionAbility.weight(player),
                action: async () => {
                    await player.useFactionAbility();
                }
            });
        }
        weights.push({
            name: "Pass",
            weight: this.weightPass(),
            action: async () => await player.passRound()
        });
        let weightTotal = weights.reduce((a, c) => a + c.weight, 0);
        if (weightTotal === 0) {
            for (let i = 0; i < player.hand.cards.length; ++i) {
                let card = player.hand.cards[i];
                if (card.row === "weather" && this.weightWeather(card) > -1 || card.abilities.includes("avenger")) {
                    await weights[i].action();
                    return;
                }
            }
            await player.passRound();
        } else {
            for (var i = 0; i < weights.length; ++i) {
                if (weights[i].card)
                    console.log("[" + weights[i].card.name + "] Weight: " + weights[i].weight);
                else
                    console.log("[" + weights[i].name + "] Weight: " + weights[i].weight);
            }
            let rand = randomInt(weightTotal);
            console.log("Chosen weight: " + rand);
            for (var i = 0; i < weights.length; ++i) {
                rand -= weights[i].weight;
                if (rand < 0)
                    break;
            }
            console.log(weights[i]);
            await weights[i].action();
        }
    }

    isSelfRowIndex(i) {
        return (this.player === player_me && i > 2) || (this.player === player_op && i < 3);
    }

    getSelfRowIndexes() {
        if (this.player === player_me)
            return [3, 4, 5];
        return [0, 1, 2];
    }

    // Collects data about card with the hightest power on the board
    getMaximums() {
        let rmax = board.row.map(r => ({
            row: r,
            cards: r.cards.filter(c => c.isUnit() && !c.isImmortal()).reduce((a, c) =>
                (!a.length || a[0].power < c.power) ? [c] : a[0].power === c.power ? a.concat([c]) : a, [])
        }));

        let max = rmax.filter((r, i) => r.cards.length && this.isSelfRowIndex(i)).reduce((a, r) => Math.max(a, r.cards[0].power), 0);
        let max_me = rmax.filter((r, i) => this.isSelfRowIndex(i) && r.cards.length && r.cards[0].power === max).reduce((a, r) =>
            a.concat(r.cards.map(c => ({
                row: r,
                card: c
            }))), []);

        max = rmax.filter((r, i) => r.cards.length && !this.isSelfRowIndex(i)).reduce((a, r) => Math.max(a, r.cards[0].power), 0);
        let max_op = rmax.filter((r, i) => !this.isSelfRowIndex(i) && r.cards.length && r.cards[0].power === max).reduce((a, r) =>
            a.concat(r.cards.map(c => ({
                row: r,
                card: c
            }))), []);

        // Also compute for rows without a shield
        let rmax_noshield = rmax.filter((r, i) => !r.row.isShielded());
        let max_noshield = rmax_noshield.filter((r, i) => r.cards.length && this.isSelfRowIndex(i)).reduce((a, r) => Math.max(a, r.cards[0].power), 0);
        let max_me_noshield = rmax_noshield.filter((r, i) => this.isSelfRowIndex(i) && r.cards.length && r.cards[0].power === max_noshield).reduce((a, r) =>
            a.concat(r.cards.map(c => ({
                row: r,
                card: c
            }))), []);

        max_noshield = rmax_noshield.filter((r, i) => r.cards.length && !this.isSelfRowIndex(i)).reduce((a, r) => Math.max(a, r.cards[0].power), 0);
        let max_op_noshield = rmax_noshield.filter((r, i) => !this.isSelfRowIndex(i) && r.cards.length && r.cards[0].power === max_noshield).reduce((a, r) =>
            a.concat(r.cards.map(c => ({
                row: r,
                card: c
            }))), []);

        return {
            rmax: rmax,
            me: max_me,
            op: max_op,
            rmax_noshield: rmax_noshield,
            me_noshield: max_me_noshield,
            op_noshield: max_op_noshield
        };
    }

    // Collects data about the types of cards on the board and in each player's graves
    getBoardData() {
        let data = this.countCards(new CardContainer());
        this.player.getAllRows().forEach(r => this.countCards(r, data));
        data.grave_me = this.countCards(this.player.grave);
        data.grave_op = this.countCards(this.player.opponent().grave);
        return data;
    }

    // Catalogs the kinds of cards in a given CardContainer
    countCards(container, data) {
        data = data ? data : {
            spy: [],
            medic: [],
            bond: {},
            scorch: []
        };
        container.cards.filter(c => c.isUnit()).forEach(c => {
            for (let x of c.abilities) {
                if (!c.isLocked()) {
                    switch (x) {
                        case "spy":
                        case "medic":
                            data[x].push(c);
                            break;
                        case "scorch_r":
                        case "scorch_c":
                        case "scorch_s":
                            data["scorch"].push(c);
                            break;
                        case "bond":
                            if (!data.bond[c.target])
                                data.bond[c.target] = 0;
                            data.bond[c.target]++;
                    }
                }
            }
        });
        return data;
    }

    // Analyses the list of cards provided and computes their total weight based on the mapping provided (dict: ability=>weight)
    // Return best X cards found with a weight higher than 0
    selectBestCards(cards, count, weights, keepZeros=false) {
        let wCards = [];
        cards.forEach(c => {
            let w = 0;
            c.abilities.forEach(ab => {
                if (ab in weights)
                    w += weights[ab];
            });
            wCards.push({ card: c, weight: w });
        });
        if (keepZeros)
            return wCards.sort((a, b) => b.weight - a.weight).slice(0, Math.min(wCards.length, count));
        return wCards.filter(c => c.weight > 0).sort((a, b) => b.weight - a.weight).slice(0, Math.min(wCards.length, count));
    }

    // Swaps a card from the hand with the deck if beneficial
    redraw() {
        let card = this.discardOrder({
            holder: this.player
        }).shift();
        if (card && card.power < 15) {
            this.player.deck.swap(this.player.hand, this.player.hand.removeCard(card));
        }
    }

    // Orders discardable cards from most to least discardable
    discardOrder(card, src = null, force = false) {
        let cards = [];
        let groups = {};
        let source = src ? src : card.holder.hand;

        let musters = source.cards.filter(c => c.abilities.includes("muster"));
        // Grouping Musters together
        musters.forEach(curr => {
            let name = curr.target;
            if (!groups[name])
                groups[name] = [];
            groups[name].push(curr);
        });
        // Keeping one in hand for each muster group 
        for (let group of Object.values(groups)) {
            group.sort(Card.compare);
            group.pop();
            cards.push(...group);
        }

        // Targets of muster that do not have the ability themselves for which we already have the "summoner"
        let tmusters = source.cards.filter(c => Object.keys(groups).includes(c.target) && !c.abilities.includes("muster"));
        cards.push(...tmusters);

        // Discarding randomly weather cards to keep only 1 in hand
        let weathers = source.cards.filter(c => c.row === "weather");
        if (weathers.length > 1) {
            weathers.splice(randomInt(weathers.length), 1);
            cards.push(...weathers);
        }
        // Discarding cards with no abilities by order of strength, unless they are of 7+
        let normal = source.cards.filter(c => c.abilities.length === 0 && c.basePower < 7);
        normal.sort(Card.compare);
        cards.push(...normal);

        // Grouping bonds together
        let bonds = source.cards.filter(c => c.abilities.includes("bond"));
        groups = {};
        bonds.forEach(curr => {
            let name = curr.target;
            if (!groups[name])
                groups[name] = [];
            groups[name].push(curr);
        });
        // Discarding those that are alone and weak (< 6)
        for (let group of Object.values(groups)) {
            if (group.length === 1 && group[0].basePower < 6) {
                cards.push(group[0]);
            }
        }

        // In this mode, we force all cards to be ordered - let's add remaining ones by order of basePower
        if (force) {
            source.cards.sort((a, b) => a.basePower - b.basePower).forEach(c => {
                if (cards.indexOf(c) < 0)
                    cards.push(c);
            });
        }

        return cards;
    }

    // Tells the Player that this object controls to play a card
    async playCard(c, max, data) {
        if (c.key === "spe_horn")
            await this.horn(c);
        else if (c.key === "spe_mardroeme")
            await this.mardroeme(c);
        else if (c.abilities.includes("decoy"))
            await this.decoy(c, max, data);
        else if (c.faction === "special" && c.abilities.includes("scorch"))
            await this.scorch(c, max, data);
        else if (c.faction === "special" && c.abilities.includes("cintra_slaughter"))
            await this.slaughterCintra(c);
        else if (c.faction === "special" && c.abilities.includes("seize"))
            await this.seizeCards(c);
        else if (c.faction === "special" && (c.abilities.includes("shield") || c.abilities.includes("shield_c") || c.abilities.includes("shield_r") || c.abilities.includes("shield_s")))
            await this.shieldCards(c);
        else if (c.faction === "special" && c.abilities.includes("lock"))
            await this.lock(c);
        else if (c.faction === "special" && c.abilities.includes("curse"))
            await this.curse(c);
        else if (c.faction === "special" && c.abilities.includes("knockback"))
            await this.knockback(c);
        else if (c.faction === "special" && c.abilities.includes("toussaint_wine"))
            await this.toussaintWine(c);
        else if ((c.isUnit() || c.hero) && c.abilities.includes("witch_hunt"))
            await this.witchHunt(c);
        else if ((c.isUnit() || c.hero) && c.row.includes("agile") && (c.abilities.includes("morale") || c.abilities.includes("horn") || c.abilities.includes("bond") ))
            await this.player.playCardToRow(c, this.bestAgileRowChange(c).row);
        else if (c.faction === "special" && c.abilities.includes("bank"))
            await this.bank(c);
        else if (c.faction === "special" && c.abilities.includes("skellige_fleet"))
            await this.skelligeFleet(c);
        else if (c.faction === "special" && c.abilities.includes("royal_decree"))
            await this.royalDecree(c);
        else
            await this.player.playCard(c);
    }

    // Plays any card with a default behaviour
    async playCardDefault(card,src=null) {
        let data_max = this.getMaximums();
        let data_board = this.getBoardData();
        if (src && src !== card.holder.hand)
            board.moveTo(card, card.holder.hand, src);
        await this.playCard(card, data_max, data_board)
    }

    // Plays a Commander's Horn to the most beneficial row. Assumes at least one viable row.
    async horn(card) {
        let rows = this.player.getAllRows().filter(r => !r.special.containsCardByKey("spe_horn"));
        let max_row;
        let max = 0;
        for (let i = 0; i < rows.length; ++i) {
            let r = rows[i];
            let dif = [0, 0];
            this.calcRowPower(r, dif, true);
            r.effects.horn++;
            this.calcRowPower(r, dif, false);
            r.effects.horn--;
            let score = dif[1] - dif[0];
            if (max < score) {
                max = score;
                max_row = r;
            }
        }
        await this.player.playCardToRow(card, max_row);
    }

    // Plays a Mardroeme to the most beneficial row. Assumes at least one viable row.
    async mardroeme(card) {
        let row, max = 0;
        this.getSelfRowIndexes().forEach(i => {
            let curr = this.weightMardroemeRow(card, board.row[i]);
            if (curr > max) {
                max = curr;
                row = board.row[i];
            }
        });
        await this.player.playCardToRow(card, row);
    }

    // Selects a card to remove from a Grave. Assumes at least one valid card.
    medic(card, grave) {
        let data = this.countCards(grave);
        let targ;
        if (data.spy.length) {
            let min = data.spy.reduce((a, c) => Math.min(a, c.power), Number.MAX_VALUE);
            targ = data.spy.filter(c => c.power === min)[0];
        } else if (data.medic.length) {
            let max = data.medic.reduce((a, c) => Math.max(a, c.power), 0);
            targ = data.medic.filter(c => c.power === max)[0];
        } else if (data.scorch.length) {
            targ = data.scorch[randomInt(data.scorch.length)];
        } else {
            let units = grave.findCards(c => c.isUnit());
            targ = units.reduce((a, c) => a.power < c.power ? c : a, units[0]);
        }
        return targ;
    }

    // Selects a card to return to the Hand and replaces it with a Decoy. Assumes at least one valid card.
    async decoy(card, max, data) {
        let targ, row;
        if (game.decoyCancelled)
            return;
        let usable_data;
        if (card.row.length > 0) {
            // Units with decoy ability only work on a specific row
            if (["close", "agile","agile_cr","agile_cs","agile_crs"].includes(card.row))
                usable_data = this.countCards(board.getRow(card, "close", this.player), usable_data);
            if (["ranged", "agile", "agile_cr", "agile_rs", "agile_crs"].includes(card.row))
                usable_data = this.countCards(board.getRow(card, "ranged", this.player), usable_data);
            if (["siege", "agile_rs", "agile_cs", "agile_crs"].includes(card.row))
                usable_data = this.countCards(board.getRow(card, "siege", this.player), usable_data);
        } else {
            usable_data = data;
        }
        if (usable_data.spy.length) {
            let min = usable_data.spy.reduce((a, c) => Math.min(a, c.power), Number.MAX_VALUE);
            targ = usable_data.spy.filter(c => c.power === min)[0];
        } else if (usable_data.medic.length) {
            targ = usable_data.medic[randomInt(usable_data.medic.length)];
        } else if (usable_data.scorch.length) {
            targ = usable_data.scorch[randomInt(usable_data.scorch.length)];
        } else {
            let pairs = max.rmax.filter((r, i) => this.isSelfRowIndex(i) && r.cards.length)
                .filter((r, i) => card.row.length === 0 || (["close", "agile", "agile_cr", "agile_cs", "agile_crs"].includes(card.row) && (i === 2 || i === 3))
                    || (["ranged", "agile", "agile_cr", "agile_rs", "agile_crs"].includes(card.row) && (i === 1 || i === 4))
                    || (["siege", "agile_rs", "agile_cs", "agile_crs"].includes(card.row) && (i === 0 || i === 5)))
                .reduce((a, r) =>
                    r.cards.map(c => ({
                        r: r.row,
                        c: c
                    })).concat(a), []);

            if (pairs.length) {
                let pair = pairs[randomInt(pairs.length)];
                targ = pair.c;
                row = pair.r;
            }
        }

        if (targ) {
            for (let i = 0; !row; ++i) {
                if (board.row[i].cards.indexOf(targ) !== -1) {
                    row = board.row[i];
                    break;
                }
            }
            targ.decoyTarget = true;
            setTimeout(() => board.toHand(targ, row), 1000);
        } else {
            row = ["close", "agile", "agile_cr", "agile_cs", "agile_crs"].includes(card.row) ? board.getRow(card, "close", this.player) : ["ranged", "agile_rs"].includes(card.row) ? board.getRow(card, "ranged", this.player) : board.getRow(card, "siege", this.player);
        }
        await this.player.playCardToRow(card, row);
    }

    // Tells the controlled Player to play the Scorch card
    async scorch(card, max, data) {
        await this.player.playScorch(card);
    }

    // Tells the controlled Player to play the Scorch card
    async slaughterCintra(card) {
        await this.player.playSlaughterCintra(card);
    }

    // Tells the controlled Player to play the seize special card
    async seizeCards(card) {
        await this.player.playSeize(card);
    }

    // Plays a shield special card to the most beneficial row. Assumes at least one viable row.
    // Also applicable for shield cards which affect only one row.
    async shieldCards(card) {
        if (card.abilities.includes("shield_c")) {
            await this.player.playCardToRow(card, board.getRow(card, "close", this.player));
            return;
        } else if (card.abilities.includes("shield_r")) {
            await this.player.playCardToRow(card, board.getRow(card, "ranged", this.player));
            return;
        }
        if (card.abilities.includes("shield_s")) {
            await this.player.playCardToRow(card, board.getRow(card, "siege", this.player));
            return;
        }

        let units = card.holder.getAllRowCards().concat(card.holder.hand.cards).filter(c => c.isUnit()).filter(c => !c.abilities.includes("spy"));
        let rowStats = {
            "close": 0,
            "ranged": 0,
            "siege": 0,
            "agile": 0,
            "agile_cr": 0,
            "agile_rs": 0,
            "agile_cs": 0,
            "agile_crs": 0
        };
        units.forEach(c => {
            rowStats[c.row] += c.power;
        });
        rowStats["close"] += (rowStats["agile"] + rowStats["agile_cr"] + rowStats["agile_cs"] + rowStats["agile_crs"]);
        rowStats["ranged"] += rowStats["agile_rs"]
        let max_row;
        if (rowStats["close"] >= rowStats["ranged"] && rowStats["close"] >= rowStats["siege"])
            max_row = board.getRow(card, "close", this.player);
        else if (rowStats["ranged"] > rowStats["close"] && rowStats["ranged"] >= rowStats["siege"])
            max_row = board.getRow(card, "ranged", this.player);
        else
            max_row = board.getRow(card, "siege", this.player);
        await this.player.playCardToRow(card, max_row);
    }

    // Plays the lock special card in the enemy melee row
    async lock(card) {
        await this.player.playCardToRow(card, board.getRow(card, "close", this.player.opponent()));
    }

    // Plays the curse special card in the enemy melee row
    async curse(card) {
        await this.player.playCardToRow(card, board.getRow(card, "close", this.player.opponent()));
    }

    // Plays the knockback special card in the most beneficial row - by default enemy melee row
    async knockback(card) {
        await this.player.playKnockback(card);
    }

    // Play special wine card to the most beneficial row.
    async toussaintWine(card) {
        await this.player.playCardToRow(card, this.bestRowToussaintWine(card));
    }

    // Play special wine card to the most beneficial row.
    async witchHunt(card) {
        await this.player.playCardToRow(card, this.bestWitchHuntRow(card).getOppositeRow());
    }

    // Plays the bank special card
    async bank(card) {
        await this.player.playBank(card);
    }

    // Plays the Skellige Fleet special card
    async skelligeFleet(card) {
        await this.player.playSkelligeFleet(card);
    }

    // Plays the Royal Decree special card
    async royalDecree(card) {
        await this.player.playRoyalDecree(card);
    }

    bestWitchHuntRow(card) {
        if (card.row.includes("agile")) {
            let r = board.getAgileRows(card, this.player.opponent());
            let rows = r.filter(r => !r.isShielded() && !game.scorchCancelled).map(r => ({
                row: r,
                value: r.minUnits().reduce((a, c) => a + c.power, 0)
            }));
            if (rows.length > 0)
                return rows.sort((a, b) => b.value - a.value)[0].row;
            else
                return r[0];
        } else {
            return board.getRow(card, card.row, card.holder.opponent());
        }
    }

    bestRowToussaintWine(card) {
        let units = card.holder.getAllRowCards().concat(card.holder.hand.cards).filter(c => c.isUnit()).filter(c => !c.abilities.includes("spy"));
        let rowStats = {
            "close": 0,
            "ranged": 0,
            "siege": 0,
            "agile": 0,
            "agile_cr": 0,
            "agile_rs": 0,
            "agile_cs": 0,
            "agile_crs": 0
        };
        units.forEach(c => {
            rowStats[c.row] += 1;
        });
        rowStats["close"] += (rowStats["agile"] + rowStats["agile_cr"] + rowStats["agile_cs"] + rowStats["agile_crs"]);
        rowStats["ranged"] += rowStats["agile_rs"]
        let rows = card.holder.getAllRows();
        rowStats["close"] = board.getRow(card, "close", this.player).effects.toussaint_wine > 0 ? 0 : rowStats["close"];
        rowStats["ranged"] = board.getRow(card, "ranged", this.player).effects.toussaint_wine > 0 ? 0 : rowStats["ranged"];
        rowStats["siege"] = board.getRow(card, "siege", this.player).effects.toussaint_wine > 0 ? 0 : rowStats["siege"];
        let max_row;
        if (rowStats["close"] >= rowStats["ranged"] && rowStats["close"] >= rowStats["siege"])
            max_row = board.getRow(card, "close", this.player);
        else if (rowStats["ranged"] > rowStats["close"] && rowStats["ranged"] >= rowStats["siege"])
            max_row = board.getRow(card, "ranged", this.player);
        else
            max_row = board.getRow(card, "siege", this.player);
        return max_row;
    }

    // Gives the list of cards on the board for which we can find a similar card in the grave or deck (either same name or target)
    // Returns for each entry: target card on bard / card in deck or grave / target row / weight
    bestSimilarCards(card) {
        let units = card.holder.getAllRowCards().filter(c => c.isUnit());
        let candidates = new Array();
        units.forEach(srcCard => {
            let targets = srcCard.holder.grave.cards.concat(srcCard.holder.deck.cards).filter((c => srcCard.name === c.name || ("target" in srcCard && srcCard.target !== "" && srcCard.target === c.target)));
            if (targets.length > 0) {
                targets.forEach(c => {
                    let pRows = c.getPlayableRows();
                    pRows.forEach(r => {
                        let weight = this.weightRowChange(c, r);
                        candidates.push([srcCard, c, r, weight]);
                    });
                });
            }
        });
        return candidates.sort((a, b) => b[3] - a[3]);
    }

    // Assigns a weight for how likely the conroller is to Pass the round
    weightPass() {
        if (this.player.health === 1)
            return 0;
        let dif = this.player.opponent().total - this.player.total;
        if (dif > 30)
            return 100;
        if (dif < -30 && this.player.opponent().hand.cards.length - this.player.hand.cards.length > 2)
            return 100;
        return Math.floor(Math.abs(dif));
    }

    // Assigns a weight for how likely the controller is to activate its leader ability
    weightLeader(card, max, data) {
        let w = ability_dict[card.abilities[0]].weight;
        if (ability_dict[card.abilities[0]].weight) {
            let score = w(card, this, max, data);
            return score;
        }
        return 10 + (game.roundCount - 1) * 15;
    }

    // Assigns a weight for how likely the controller will use a scorch-row card
    weightScorchRow(card, max, row_name) {
        if (game.scorchCancelled)
            return 0;
        let index = 3 + (row_name === "close" ? 0 : row_name === "ranged" ? 1 : 2);
        if (this.player === player_me)
            index = 2 - (row_name === "close" ? 0 : row_name === "ranged" ? 1 : 2);
        if (board.row[index].total < 10 || board.row[index].isShielded())
            return 0;
        let score = max.rmax[index].cards.reduce((a, c) => a + c.power, 0);
        return score;
    }

    // Calculates a weight for how likely the controller will use horn on this row
    weightHornRow(card, row) {
        return row.effects.horn ? 0 : this.weightRowChange(card, row);
    }

    // Calculates weight for playing a card on a given row, min 0
    weightRowChange(card, row) {
        return Math.max(0, this.weightRowChangeTrue(card, row));
    }

    bestAgileRowChange(card) {
        let rows = [];
        let r = board.getAgileRows(card, card.holder);
        r.forEach(row => rows.push({ row: row, score: 0 }));
        for (var i = 0; i < rows.length ; i++) {
            rows[i].score = this.weightRowChange(card, rows[i].row);
        }
        return rows.sort((a, b) => b.score - a.score)[0];
    }

    // Calculates weight for playing a card on the given row
    weightRowChangeTrue(card, row) {
        let dif = [0, 0];
        this.calcRowPower(row, dif, true);
        row.updateState(card, true);
        this.calcRowPower(row, dif, false);
        if (!card.isSpecial())
            dif[0] -= row.calcCardScore(card);
        row.updateState(card, false);
        return dif[1] - dif[0];
    }

    // Weights the diff of changing a card from a row to another
    weightRowSwap(card, src, dest) {
        if (src === dest)
            return 0;
        return (this.weightRowChangeTrue(card, dest) - this.weightRowChangeTrue(card, src));
    }

    // Calculates for all cards on the given player's side of the board the diff of score if changing location to another row
    // Returns results sorted by best or worst first, depending if "best" parameter is on or off
    weightAllCardsRowChanges(player, best = true) {
        let weights = [];
        let cards = player.getAllRowCards();
        let rows = player.getAllRows();
        cards.filter(c => c.hero || c.isUnit()).forEach(c => {
            rows.forEach(r => {
                if (r !== c.currentLocation) {
                    weights.push({ row: r, card: c, score: this.weightRowSwap(c, c.currentLocation, r) })
                }
            });
        });
        if (best) {
            return weights.sort((a, b) => b.score - a.score);
        } else {
            return weights.sort((a, b) => a.score - b.score);
        }
    }

    // Calculates the weight for playing a weather card
    weightWeather(card) {
        let rows;
        // This specific weather card has 2 modes
        if (card.key === "spe_storm") {
            return Math.max(this.weightWeather({ key: "storm", abilities: ["frost", "fog"] }), this.weightWeather({ key: "storm", abilities: ["rain", "fog"] }));
        }
        if (card.abilities) {
            if (card.key === "spe_clear")
                rows = Object.values(weather.types).filter(t => t.count > 0).flatMap(t => t.rows);
            else
                rows = Object.values(weather.types).filter(t => t.count === 0 && card.abilities.includes(t.name)).flatMap(t => t.rows);
        } else {
            if (card.ability == "clear")
                rows = Object.values(weather.types).filter(t => t.count > 0).flatMap(t => t.rows);
            else
                rows = Object.values(weather.types).filter(t => t.count === 0 && t.name === card.ability).flatMap(t => t.rows);
        }

        if (!rows.length)
            return 1;
        let dif = [0, 0];
        rows.forEach(r => {
            let state = r.effects.weather;
            this.calcRowPower(r, dif, true);
            r.effects.weather = !state;
            this.calcRowPower(r, dif, false);
            r.effects.weather = state;
        });
        return dif[1] - dif[0];
    }

    // Calculates the weight for playing a mardroeme card
    weightMardroemeRow(card, row) {
        if (card.key === "spe_mardroeme" && row.special.containsCardByKey("spe_mardroeme"))
            return 0;
        let ermion = card.holder.hand.cards.filter(c => c.key === "sk_ermion").length > 0;
        if (ermion && card.key !== "sk_ermion" && row === board.getRow(card, "ranged", this.player))
            return 0;
        let bers_cards = row.cards.filter(c => c.abilities.includes("berserker"));
        let weightData = {
            bond: {},
            strength: 0,
            scorch: 0
        };

        for (var i = 0; i < bers_cards.length; i++) {
            var c = bers_cards[i];
            var ctarget = card_dict[c.target];
            weightData.strength -= c.power;
            if (ctarget.ability.includes("morale"))
                weightData.strength += Number(ctarget["strength"]) + row.cards.filter(c => c.isUnit()).length - 1;
            if (ctarget.ability.includes("bond")) {
                if (!weightData.bond[c.target])
                    weightData.bond[c.target] = [0, Number(ctarget["strength"])];
                weightData.bond[c.target][0]++;
            }
            if (ctarget.ability.includes("scorch_c"))
                weightData.scorch += this.weightScorchRow(card, this.getMaximums(), "close");
        }
        let weight = weightData.strength + Object.keys(weightData.bond).reduce((s, c) => s + Math.pow(weightData.bond[c][0], 2) * weightData.bond[c][1], 0) + weightData.scorch;
        return Math.max(1, weight);
    }

    // Calculates the weight for cards with the medic ability
    weightMedic(data, score, owner) {
        let units = owner.grave.findCards(c => c.isUnit());
        let grave = data["grave_" + owner.opponent().tag];
        return !units.length ? Math.min(1, score) : score + (grave.spy.length ? 50 : grave.medic.length ? 15 : grave.scorch.length ? 10 : this.player.health === 1 ? 1 : 0);
    }

    // Calculates the weight for cards with the berserker ability
    weightBerserker(card, row, score) {
        if (card.holder.hand.cards.filter(c => c.abilities.includes("mardroeme")).length < 1 && !row.effects.mardroeme > 0)
            return score;
        score -= card.basePower;
        let ctarget = card_dict[card.target];
        if (ctarget.ability.includes("morale")) {
            score += Number(ctarget["strength"]) + row.cards.filter(c => c.isUnit()).length - 1;
        } else if (ctarget.ability.includes("bond")) {
            let n = 1;
            if (!row.effects.mardroeme)
                n += row.cards.filter(c => c.key === card.key).filter(c => !c.isLocked()).length;
            else
                n += row.cards.filter(c => c.key === card.target).filter(c => !c.isLocked()).length;
            score += Number(ctarget["strength"]) * (n * n);
        } else if (ctarget.ability.includes("scorch_c")) {
            score += this.weightScorchRow(card, this.getMaximums(), "close");
        } else {
            score += Number(ctarget["strength"]);
        }
        return Math.max(1, score);
    }

    // Calculates the weight for a weather card if played from the deck
    weightWeatherFromDeck(card, weather_id) {
        if (card.holder.deck.findCard(c => c.abilities.includes(weather_id)) === undefined)
            return 0;
        return this.weightCard({
            abilities: [weather_id],
            row: "weather"
        });
    }

    // Assigns a weights for how likely the controller with play a card from its hand
    weightCard(card, max, data) {
        let abi
        if (card.abilities) {
            abi = card.abilities;
        } else if (card["ability"]) {
            abi = card["ability"].split(" ");
        } else {
            abi = [];
            console.log("Missing abilities for card:");
            console.log(card);
        }
        if (abi.includes("decoy")) {
            if (card.row.length > 0) {
                let row_data;
                if (["close","agile","agile_cr","agile_cs","agile_crs"].includes(card.row))
                    row_data = this.countCards(board.getRow(card, "close", this.player), row_data);
                if (["ranged", "agile", "agile_cr", "agile_rs", "agile_crs"].includes(card.row))
                    row_data = this.countCards(board.getRow(card, "ranged", this.player), row_data);
                if (["agile_cs", "agile_rs", "agile_crs"].includes(card.row))
                    row_data = this.countCards(board.getRow(card, "siege", this.player), row_data);
                return game.decoyCancelled ? 0 : row_data.spy.length ? 50 : row_data.medic.length ? 15 : row_data.scorch.length ? 10 : max.me.length ? card.power : 0;
            } else
                return game.decoyCancelled ? 0 : data.spy.length ? 50 : data.medic.length ? 15 : data.scorch.length ? 10 : max.me.length ? 1 : 0;
        }
        if (abi.includes("horn")) {
            let rows = this.player.getAllRows().filter(r => !r.special.containsCardByKey("spe_horn"));
            if (!rows.length)
                return 0;
            rows = rows.map(r => this.weightHornRow(card, r));
            return Math.max(...rows) / 2;
        }

        if (abi) {
            if (abi.includes("scorch")) {
                if (game.scorchCancelled)
                    return Math.max(0, card.power);
                let power_op = max.op_noshield.length ? max.op_noshield[0].card.power : 0;
                let power_me = max.me_noshield.length ? max.me_noshield[0].card.power : 0;
                let total_op = power_op * max.op_noshield.length;
                let total_me = power_me * max.me_noshield.length;
                return power_me > power_op ? 0 : power_me < power_op ? total_op : Math.max(0, total_op - total_me);
            }
            if (abi.includes("decoy")) {
                return game.decoyCancelled ? 0 : data.spy.length ? 50 : data.medic.length ? 15 : data.scorch.length ? 10 : max.me.length ? 1 : 0;
            }
            if (abi.includes("mardroeme")) {
                let rows = this.player.getAllRows();
                return Math.max(...rows.map(r => this.weightMardroemeRow(card, r)));
            }
            if (["cintra_slaughter", "seize", "lock", "shield", "knockback", "shield_c", "shield_r", "shield_s", "bank", "skellige_fleet","immortal","royal_decree","summon_one_of","curse"].includes(abi.at(-1))) {
                return ability_dict[abi.at(-1)].weight(card);
            }
            if (abi.includes("witch_hunt")) {
                if (game.scorchCancelled)
                    return card.power;
                let best_row = this.bestWitchHuntRow(card)
                if (best_row) {
                    let dmg = best_row.minUnits().reduce((a, c) => a + c.power, 0);
                    if (dmg < 6) // Let's not waste it on isolated weak units
                        dmg = 0;
                    return dmg + card.power;
                }
                return card.power
            }
            if (abi.includes("toussaint_wine")) {
                let units = card.holder.getAllRowCards().concat(card.holder.hand.cards).filter(c => c.isUnit()).filter(c => !c.abilities.includes("spy"));
                let rowStats = {
                    "close": 0,
                    "ranged": 0,
                    "siege": 0,
                    "agile": 0,
                    "agile_cr": 0,
                    "agile_rs": 0,
                    "agile_cs": 0,
                    "agile_crs": 0
                };
                units.forEach(c => {
                    rowStats[c.row] += 1;
                });
                rowStats["close"] += (rowStats["agile"] + rowStats["agile_cr"] + rowStats["agile_cs"] + rowStats["agile_crs"]);
                rowStats["ranged"] += rowStats["agile_rs"]

                let rows = card.holder.getAllRows();
                rowStats["close"] = board.getRow(card, "close", this.player).effects.toussaint_wine > 0 ? 0 : rowStats["close"];
                rowStats["ranged"] = board.getRow(card, "ranged", this.player).effects.toussaint_wine > 0 ? 0 : rowStats["ranged"];
                rowStats["siege"] = board.getRow(card, "siege", this.player).effects.toussaint_wine > 0 ? 0 : rowStats["siege"];
                return 2 * Math.max(rowStats["close"], rowStats["ranged"], rowStats["siege"]);
            }
            if (abi.at(-1) && abi.at(-1).startsWith("witcher_")) {
                let witchers = card.holder.getAllRowCards().filter(c => c.abilities.includes(abi.at(-1)));
                let keep = witchers.filter(c => c.hero);
                return card.power + (2 * witchers.length * 2) + (keep.length > 0 ? keep[0].power : 0);
            }
            if (abi.includes("inspire")) {
                let insp = card.holder.getAllRowCards().filter(c => c.abilities.includes("inspire"));
                let best_power = 0;
                if (insp.length > 0)
                    best_power = insp.sort((a, b) => b.power - a.power)[0].power;
                let max_power = Math.max(card.power, best_power);
                if (card.power === max_power)
                    return max_power + insp.map(c => max_power - c.power).reduce((a, c) => a + c, 0);
                return max_power;
            }
        }

        if (card.row === "weather" || (card.deck && card.deck.startsWith("weather"))) {
            return Math.max(0, this.weightWeather(card));
        }

        let row = board.getRow(card, ["agile", "agile_cr", "agile_cs", "agile_crs"].includes(card.row) ? "close" : ["ranged","agile_rs"].includes(card.row) ? "ranged" : card.row, this.player);
        let score = row.calcCardScore(card);
        switch (abi[abi.length - 1]) {
            case "bond":
            case "morale":
            case "toussaint_wine":
            case "horn":
                score = card.row.includes("agile") ? this.bestAgileRowChange(card).score : this.weightRowChange(card, row);
                break;
            case "medic":
                score = this.weightMedic(data, score, card.holder);
                break;
            case "spy":
                score = 15 + score;
                break;
            case "muster":
                let pred = c => c.target === card.target;
                let units = card.holder.hand.cards.filter(pred).concat(card.holder.deck.cards.filter(pred));
                score *= units.length;
                break;
            case "scorch_c":
                score = Math.max(1, this.weightScorchRow(card, max, "close"));
                break;
            case "scorch_r":
                score = Math.max(1, this.weightScorchRow(card, max, "ranged"));
                break;
            case "scorch_s":
                score = Math.max(1, this.weightScorchRow(card, max, "siege"));
                break;
            case "berserker":
                score = this.weightBerserker(card, row, score);
                break;
            case "avenger":
            case "avenger_kambi":
            case "whorshipper":
            case "necrophage":
            case "goetia":
            case "ambush":
                return score + ability_dict[abi.at(-1)].weight(card);
        }

        return score;
    }

    // Calculates the current power of a row associated with each Player
    calcRowPower(r, dif, add) {
        r.findCards(c => c.isUnit()).forEach(c => {
            let p = r.calcCardScore(c);
            c.holder === this.player ? (dif[0] += add ? p : -p) : (dif[1] += add ? p : -p);
        });
    }
}

var may_leader = true,
    exibindo_lider = false;

// Can make actions during turns like playing cards that it owns
class Player {
    constructor(id, name, deck, isAI = true) {
        this.id = id;
        this.tag = (id === 0) ? "me" : "op";
        //this.controller = (id === 0) ? new Controller() : new ControllerAI(this);
        if (isAI) {
            this.controller = new ControllerAI(this);
        } else {
            this.controller = new Controller();
            this.ai = new ControllerAI(this); // Exposes AI features which can be used by the actual AI to make estimations
        }

        if (game.mode === 2) {
            // AI vs AI
            this.hand = (id === 0) ? new Hand(document.getElementById("hand-row"), this.tag) : new Hand(document.getElementById("op-hand-row"), this.tag);
        } else if (game.mode === 3) {
            // Player vs Player
            if (id === 0) {
                this.hand = new Hand(document.getElementById("hand-row"), this.tag);
            } else {
                this.hand = new Hand(document.getElementById("op-hand-row"), this.tag);
                document.getElementById("op-hand-row").classList.add("human-op"); // This a playable opponent hand
            }
        } else {
            this.hand = (id === 0) ? new Hand(document.getElementById("hand-row"), this.tag) : new HandAI(this.tag);
        }
        this.hand.player = this;
        this.grave = new Grave(document.getElementById("grave-" + this.tag));
        this.deck = new Deck(deck.faction, document.getElementById("deck-" + this.tag));
        this.deck_data = deck;
        this.leader = new Card(deck.leader.index, deck.leader.card, this);
        this.elem_leader = document.getElementById("leader-" + this.tag);
        this.elem_leader.children[0].appendChild(this.leader.elem);

        this.reset();

        this.name = name;
        document.getElementById("name-" + this.tag).innerHTML = name;

        if (deck.title)
            document.getElementById("deck-name-" + this.tag).innerHTML = deck.title;
        else
            document.getElementById("deck-name-" + this.tag).innerHTML = factions[deck.faction].name;
        document.getElementById("stats-" + this.tag).getElementsByClassName("profile-img")[0].children[0].children[0];
        let x = document.querySelector("#stats-" + this.tag + " .profile-img > div > div");
        x.style.backgroundImage = iconURL("deck_shield_" + deck.faction);
    }

    getAIController() {
        if (this.controller instanceof ControllerAI) {
            return this.controller;
        } else {
            return this.ai;
        }
    }

    // Sets default values
    reset() {
        this.grave.reset();
        this.hand.reset();
        this.deck.reset();
        this.deck.initializeFromID(this.deck_data.cards, this);

        this.health = 2;
        this.total = 0;
        this.passed = false;
        this.handsize = 10;
        this.mulliganCount = 2;
        this.winning = false;
        this.factionAbilityUses = 0;
        this.effects = {
            "witchers": {},
            "whorshippers": 0,
            "inspire": 0
        };
        this.capabilities = {
            "drawOPdeck": 0,
            "endTurnRetake": 0,
            "cardEdit": 0
        };
        this.forcedActions = [];
        this.endturn_action = null;

        // Handling Faction abilities: active or passive
        let factionAbility = factions[this.deck.faction];
        if (factionAbility["activeAbility"]) {
            // Init ability if need be
            if (factionAbility.factionAbilityInit) {
                factionAbility.factionAbilityInit(this);
            }
            this.updateFactionAbilityUses(factionAbility["abilityUses"]);

            document.getElementById("faction-ability-" + this.tag).classList.remove("hide");
            if (this.tag === "me" || game.isPvP())
                document.getElementById("faction-ability-" + this.tag).addEventListener("click", () => this.activateFactionAbility(), false);
        } else {
            document.getElementById("faction-ability-" + this.tag).classList.add("hide");
        }

        this.enableLeader();
        this.setPassed(false);
        document.getElementById("gem1-" + this.tag).classList.add("gem-on");
        document.getElementById("gem2-" + this.tag).classList.add("gem-on");
    }

    roundStartReset() {
        this.effects = {
            "witchers": {},
            "whorshippers": 0,
            "inspire": 0
        };
        this.forcedActions = [];
    }

    // Returns the opponent Player
    opponent() {
        return board.opponent(this);
    }

    // Updates the player's total score and notifies the gamee
    updateTotal(n) {
        this.total += n;
        document.getElementById("score-total-" + this.tag).children[0].innerHTML = this.total;
        board.updateLeader();
    }

    // Puts the player in the winning state
    setWinning(isWinning) {
        if (this.winning ^ isWinning)
            document.getElementById("score-total-" + this.tag).classList.toggle("score-leader");
        this.winning = isWinning;
    }

    // Puts the player in the passed state
    setPassed(hasPassed) {
        if (this.passed ^ hasPassed)
            document.getElementById("passed-" + this.tag).classList.toggle("passed");
        this.passed = hasPassed;
    }

    // Sets up board for turn
    async startTurn() {
        document.getElementById("stats-" + this.tag).classList.add("current-turn");
        if (this.leaderAvailable)
            this.elem_leader.children[1].classList.remove("hide");

        if (this === player_me || game.isPvP()) {
            document.getElementById("pass-button").classList.remove("noclick");
            may_pass1 = true;
        }

        if (this.controller instanceof ControllerAI) {
            await this.controller.startTurn(this);
        } else {
            // If there is a pending forced action, do it or pass
            if (this.forcedActions.length > 0) {
                let card = this.forcedActions.splice(0, 1)[0];
                ui.showPreviewVisuals(card);
                // Ask if the player wants to play the card or pass
                let c = await ui.popup("Play card [E]", (p) => p.choice = true, "Pass [Q]", (p) => p.choice = false, "Play card or pass?", "You are forced to play this card or pass for this round, which option do you choose?");
                ui.enablePlayer(true);
                if (c) {
                    document.getElementById("click-background").classList.add("noclick");
                    this.hand.cards.forEach(c => c.elem.classList.add("noclick"));
                    ui.setSelectable(card, true);
                } else {
                    this.passRound();
                }
            }
        }
    }

    // Passes the round and ends the turn
    async passRound() {
        this.setPassed(true);
        ui.notification("op-pass", 1200);
        await this.endTurn();
    }

    // Plays a scorch card
    async playScorch(card) {
        if (!game.scorchCancelled)
            await this.playCardAction(card, async () => await ability_dict["scorch"].activated(card));
    }

    // Plays a Slaughter of Cintra card
    async playSlaughterCintra(card) {
        await this.playCardAction(card, async () => await ability_dict["cintra_slaughter"].activated(card));
    }

    // Plays a Seize special card card
    async playSeize(card) {
        await this.playCardAction(card, async () => await ability_dict["seize"].activated(card));
    }

    // Plays a Knockback special card card, assuming 1 valid
    async playKnockback(card) {
        let best_row = board.getRow(card, "close", this.opponent());
        //If melee row is empty, better target ranged
        if (board.getRow(card, "close", this.opponent()).cards.length === 0)
            best_row = board.getRow(card, "ranged", this.opponent());
        // If siege has an active weather effect, better target ranged
        if (board.getRow(card, "ranged", this.opponent()).cards.length > 1 && board.getRow(card, "siege", this.opponent()).effects.weather)
            best_row = board.getRow(card, "ranged", this.opponent());
        // If ranged has a horn or shield effect, better target it
        if ((board.getRow(card, "ranged", this.opponent()).isShielded() || board.getRow(card, "ranged", this.opponent()).effects.horn > 0) && board.getRow(card, "ranged", this.opponent()).cards.length > 0)
            best_row = board.getRow(card, "ranged", this.opponent());
        // If there are some bond units in the ranged row, better try to break it before it grows
        if (Object.keys(board.getRow(card, "ranged", this.opponent()).effects.bond).length > 0 && board.getRow(card, "siege", this.opponent()).effects.horn === 0)
            best_row = board.getRow(card, "ranged", this.opponent());
        await this.playCardAction(card, async () => await ability_dict["knockback"].activated(card, best_row));
    }

    // Play the bank card
    async playBank(card) {
        await this.playCardAction(card, async () => await ability_dict["bank"].activated(card));
    }

    // Play the skellige fleet card
    async playSkelligeFleet(card) {
        await this.playCardAction(card, async () => await ability_dict["skellige_fleet"].activated(card));
    }

    // Play the royal decree card
    async playRoyalDecree(card) {
        await this.playCardAction(card, async () => await ability_dict["royal_decree"].activated(card));
    }

    // Plays a card to a specific row
    async playCardToRow(card, row, endTurn=true) {
        await this.playCardAction(card, async () => await board.moveTo(card, row, this.hand), endTurn);
    }

    // Plays a card to the board from hand
    async playCard(card) {
        await this.playCardAction(card, async () => await card.autoplay(this.hand));
    }

    // Shows a preview of the card being played, plays it to the board and ends the turn
    async playCardAction(card, action, endTurn = true) {
        ui.showPreviewVisuals(card);
        await sleep(1000);
        ui.hidePreview(card);
        await action();
        if(endTurn)
            await this.endTurn();
    }

    // Handles end of turn visuals and behavior the notifies the game
    async endTurn(noEffects=false) {
        if (this.endturn_action) {
            // Call action instead of ending turn
            await this.endturn_action();
            return;
        }
        if (!this.passed && !this.canPlay()) {
            this.setPassed(true);
            ui.notification("op-pass", 1200);
        }
        if (this === player_me) {
            document.getElementById("pass-button").classList.add("noclick");
            may_pass1 = false;
        }
        document.getElementById("stats-" + this.tag).classList.remove("current-turn");
        this.elem_leader.children[1].classList.add("hide");
        game.endTurn(noEffects)
    }

    // Tells the the Player if it won the round. May damage health.
    endRound(win) {
        if (!win) {
            if (this.health < 1)
                return;
            document.getElementById("gem" + this.health + "-" + this.tag).classList.remove("gem-on");
            this.health--;
        }
        this.setPassed(false);
        this.setWinning(false);
    }

    // Returns true if the Player can make any action other than passing
    canPlay() {
        return this.hand.cards.length > 0 || this.leaderAvailable || this.factionAbilityUses > 0;
    }

    // Use a leader's Activate ability, then disable the leader
    // Option to not end turn and disable leader - useful when we want to trigger the leader ability in other circumstances
    async activateLeader(endTurn=true,disableLeader=true) {
        try {
            Carousel.curr.cancel();
        } catch (err) { }
        if (this.leaderAvailable) {
            this.endTurnAfterAbilityUse = endTurn;
            let res = await this.leader.activated[0](this.leader, this);
            
            if (res == false) {
                ui.enablePlayer(true);
                return false;
            }
            if (disableLeader)
                this.disableLeader();
           
            if (this.id === 0 && this.deck && this.deck.faction === "wild_hunt" && this.hand && this.hand.cards.length === 0) {
                if (typeof sleep === "function") {
                    await sleep(1000);
                }
            }

            if (this.endTurnAfterAbilityUse)
                await this.endTurn();
            else {
                if (this.controller instanceof ControllerAI) {
                    if (this.leader.key === "wu_alzur_maker") {
                        let worse_unit = this.getAllRowCards().filter(c => c.isUnit()).sort((a, b) => a.power - b.power)[0];
                        ui.selectCard(worse_unit);
                    } else if (this.leader.key === "to_anna_henrietta_duchess") {
                        let horns = player_me.getAllRows().filter(r => r.special.findCards(c => c.abilities.includes("horn")).length > 0).sort((a, b) => b.total - a.total);
                        if (horns[0])
                            ui.selectRow(horns[0]);
                    } else if (this.leader.key === "lr_meve_princess" || this.leader.key === "sy_carlo_varese") {
                        let max = this.controller.getMaximums();
                        let rows = [this.controller.weightScorchRow(this.leader, max, "close"), this.controller.weightScorchRow(this.leader, max, "ranged"), this.controller.weightScorchRow(this.leader, max, "siege")];
                        let maxv = 0, max_row;
                        let offset = 3;
                        if (this === player_me) {
                            offset = 0;
                            rows = rows.reverse();
                        }
                        for (var i = 0; i < 3; i++) {
                            if (rows[i] > maxv) {
                                maxv = rows[i];
                                max_row = board.row[offset + i];
                            }
                        }
                        if (max_row)
                            ui.selectRow(max_row);
                    } else if (this.leader.key === "sy_cyrus_hemmelfart") {
                        let offset = 3;
                        if (this === player_me)
                            offset = 0;
                        ui.selectRow(board.row[offset + randomInt(2)]);
                    }
                }
            }
        }
    }

    // Disable access to leader ability and toggles leader visuals to off state
    disableLeader() {
        this.leaderAvailable = false;
        let elem = this.elem_leader.cloneNode(true);
        this.elem_leader.parentNode.replaceChild(elem, this.elem_leader);
        this.elem_leader = elem;
        this.elem_leader.children[0].classList.add("fade");
        this.elem_leader.children[1].classList.add("hide");
        this.elem_leader.addEventListener("click", async () => await ui.viewCard(this.leader), false);
    }

    // Enable access to leader ability and toggles leader visuals to on state
    enableLeader() {
        this.leaderAvailable = this.leader.activated.length > 0;
        let elem = this.elem_leader.cloneNode(true);
        this.elem_leader.parentNode.replaceChild(elem, this.elem_leader);
        this.elem_leader = elem;
        this.elem_leader.children[0].classList.remove("fade");
        this.elem_leader.children[1].classList.remove("hide");

        if ((this.id === 0 || game.isPvP()) && this.leader.activated.length > 0) {
            this.elem_leader.children[0].addEventListener("click",
                async () => await ui.viewCard(this.leader, async () => await this.activateLeader()),
                false
            );
            this.elem_leader.children[0].addEventListener("mouseover", function () {
                tocar("card", false);
                this.style.boxShadow = "0 0 1.5vw #6d5210"
            });
            this.elem_leader.children[0].addEventListener("mouseout", function () {
                this.style.boxShadow = "0 0 0 #6d5210"
            });

            window.addEventListener("keydown", function (e) {
                if (may_leader && may_pass1) {
                    if (e.keyCode == 88) {
                        if (exibindo_lider) {
                            exibindo_lider = false;
                            player_me.activateLeader();
                        } else if (player_me.leaderAvailable) {
                            may_leader = false;
                            exibindo_lider = true;
                            player_me.callLeader();
                        }
                    }
                }
            });
            window.addEventListener("keyup", function (e) {
                if (player_me.leaderAvailable) may_leader = true;
            });
        } else {
            this.elem_leader.children[0].addEventListener("click", async () => await ui.viewCard(this.leader), false);
            this.elem_leader.children[0].addEventListener("mouseover", function () { });
            this.elem_leader.children[0].addEventListener("mouseout", function () { });
        }
        // TODO set crown color
    }

    async callLeader() {
        await ui.viewCard(player_me.leader, async () => await player_me.activateLeader());
    }

        replaceLeader(newLeader) {
        this.leader = newLeader;
        
        if (this.elem_leader && this.elem_leader.children && this.elem_leader.children[0]) {
            let contenedorFisico = this.elem_leader.children[0];
            
           
            contenedorFisico.innerHTML = "";
            
            if (this.leader && this.leader.elem) {
                contenedorFisico.appendChild(this.leader.elem);
            }
        } else {
            try {
                this.elem_leader.children[0].children[0].replaceWith(this.leader.elem);
            } catch(err) { }
        }

        this.enableLeader();
        
        if (this.leader && typeof this.leader.update === "function") {
            this.leader.update();
        }

        let ab = this.leader.abilities[0];
        if (ability_dict[ab].placed)
            ability_dict[ab].placed(this.leader);
    }


    async activateFactionAbility() {
        let factionData = factions[this.deck.faction];
        if (factionData.activeAbility && this.factionAbilityUses > 0) {
            await ui.popup("Use faction ability [E]", () => this.useFactionAbility(), "Cancel [Q]", () => this.escapeFactionAbility(), "Would you like to use your faction ability?", "Faction ability: " + factionData.description);
        }
        return;
    }

    async useFactionAbility() {
        let factionData = factions[this.deck.faction];
        if (factionData.activeAbility && this.factionAbilityUses > 0) {
            this.endTurnAfterAbilityUse = true;
            await factionData.factionAbility(this);
            this.updateFactionAbilityUses(this.factionAbilityUses - 1);
            // Some faction abilities require extra interractions
            if (this.endTurnAfterAbilityUse)
                await this.endTurn();
            if (this.controller instanceof ControllerAI) {
                if (this.deck.faction === "lyria_rivia") {
                    let best_row = this.controller.bestRowToussaintWine(ui.previewCard); // Reusing bestRowToussaintWine because it is nearly the same principle
                    ui.selectRow(best_row, true);
                }
            }
        }
        return;
    }

    // Called when chose to not play the faction ability
    async escapeFactionAbility() {
        ui.enablePlayer(true);
    }

    updateFactionAbilityUses(count) {
        this.factionAbilityUses = Math.max(0, count);
        document.getElementById("faction-ability-count-" + this.tag).innerHTML = this.factionAbilityUses;
        if (this.factionAbilityUses === 0) {
            document.getElementById("faction-ability-" + this.tag).classList.add("fade");
        } else {
            document.getElementById("faction-ability-" + this.tag).classList.remove("fade");
        }
    }

    // Get all rows for this player, sorted to have close > ranged > siege
    getAllRows() {
        if (this === player_me) {
            return board.row.filter((r, i) => i > 2);
        }
        return board.row.filter((r, i) => i < 3).reverse();
    }

    // Get all special rows for this player, sorted to have close > ranged > siege
    getAllSpecialRows() {
        return this.getAllRows().map(r => r.special);
    }

    // Get all cards in rows for this player
    getAllRowCards() {
        return this.getAllRows().reduce((a, r) => r.cards.concat(a), []);
    }

    // Get all cards in special rows for this player
    getAllSpecialRowCards() {
        return this.getAllSpecialRows().reduce((a, r) => r.cards.concat(a), []);
    }

    // Prepare game and UI to let the player select where on the board to play the given card
    selectCardDestination(card,src=null,callback=null) {
        // Move from deck to hand
        if(src)
            src.removeCard(card);
        this.hand.addCard(card);
        // Enable board interaction - Force to select a destination
        ui.showPreviewVisuals(card);
        document.getElementById("click-background").classList.add("noclick");
        this.hand.cards.forEach(c => c.elem.classList.add("noclick"));
        ui.setSelectable(card, true);
        // Prevent the end of turn while selecting cards
        this.endturn_action = async () => {
            this.endturn_action = null;
            if (callback)
                callback();
        }
        ui.enablePlayer(true);
    }
}

function alteraClicavel(obj, add) {
    try {
        if (!add && fileira_clicavel.elem.id == obj.elem.id) fileira_clicavel = null;
        else fileira_clicavel = obj;
    } catch (err) { }
}

// Handles the adding, removing and formatting of cards in a container
class CardContainer {
    constructor(elem) {
        this.elem = elem;
        this.cards = [];
    }

    // Indicates whether or not this container contains any card
    isEmpty() {
        return this.cards.length === 0;
    }

    // Returns the first card that satisfies the predcicate. Does not modify container.
    findCard(predicate) {
        for (let i = this.cards.length - 1; i >= 0; --i)
            if (predicate(this.cards[i]))
                return this.cards[i];
    }

    // Returns a list of cards that satisfy the predicate. Does not modify container.
    findCards(predicate) {
        return this.cards.filter(predicate);
    }

    // Indicates whether or not the card with given Key can be found in container
    containsCardByKey(key) {
        return (this.findCards(c => c.key === key).length) > 0;
    }

    // Returns a list of up to n cards that satisfy the predicate. Does not modify container.
    findCardsRandom(predicate, n) {
        let valid = predicate ? this.cards.filter(predicate) : this.cards;
        if (valid.length === 0)
            return [];
        if (!n || n === 1)
            return [valid[randomInt(valid.length)]];
        // Randum shuffle then select first n items
        valid = [...valid].sort(() => 0.5 - Math.random())
        return valid.slice(0, n);
    }

    // Removes and returns a list of cards that satisy the predicate.
    getCards(predicate) {
        return this.cards.reduce((a, c, i) => (predicate(c, i) ? [i] : []).concat(a), []).map(i => this.removeCard(i));
    }

    // Removes and returns a card that satisfies the predicate.
    getCard(predicate) {
        for (let i = this.cards.length - 1; i >= 0; --i)
            if (predicate(this.cards[i]))
                return this.removeCard(i);
    }

    // Removes and returns any cards up to n that satisfy the predicate.
    getCardsRandom(predicate, n) {
        return this.findCardsRandom(predicate, n).map(c => this.removeCard(c));
    }

    // Adds a card to the container along with its associated HTML element.
    addCard(card, index) {
        this.cards.push(card);
        this.addCardElement(card, index ? index : 0);
        this.resize();
        card.currentLocation = this;
    }

    // Removes a card from the container along with its associated HTML element.
    removeCard(card, index) {
        if (this.cards.length === 0)
            throw "Cannot draw from empty " + this.constructor.name;
        card = this.cards.splice(isNumber(card) ? card : this.cards.indexOf(card), 1)[0];
        this.removeCardElement(card, index ? index : 0);
        this.resize();
        if (card.temporaryPower) {
            card.basePower = card.originalBasePower;
            card.originalBasePower = null;
            card.temporaryPower = false;
        }
        return card;
    }

    // Adds a card to a pre-sorted CardContainer
    addCardSorted(card) {
        let i = this.getSortedIndex(card);
        this.cards.splice(i, 0, card);
        return i;
    }

    // Returns the expected index of a card in a sorted CardContainer
    getSortedIndex(card) {
        for (var i = 0; i < this.cards.length; ++i)
            if (Card.compare(card, this.cards[i]) < 0)
                break;
        return i;
    }

    // Adds a card to a random index of the CardContainer
    addCardRandom(card) {
        this.cards.push(card);
        let index = randomInt(this.cards.length);
        if (index !== this.cards.length - 1) {
            let t = this.cards[this.cards.length - 1];
            this.cards[this.cards.length - 1] = this.cards[index];
            this.cards[index] = t;
        }
        card.currentLocation = this;
        return index;
    }

   
    removeCardElement(card, index) {
        if (this.elem && card && card.elem) {
            if (this.elem.contains(card.elem)) {
                this.elem.removeChild(card.elem);
            } else if (card.elem.parentNode) {
                card.elem.parentNode.removeChild(card.elem);
            } else {
                card.elem.remove();
            }
        }
    }


    // Adds the HTML element associated with the card to this CardContainer
    addCardElement(card, index) {
        if (this.elem) {
            if (index === this.cards.length)
                this.elem.appendChild(card.elem);
            else
                this.elem.insertBefore(card.elem, this.elem.children[index]);
        }
    }

    // Empty function to be overried by subclasses that resize their content
    resize() { }

    // Modifies the margin of card elements inside a row-like container to stack properly
    resizeCardContainer(overlap_count, gap, coef) {
        let n = this.elem.children.length;
        let param = (n < overlap_count) ? "" + gap + "vw" : defineCardRowMargin(n, coef);
        let children = this.elem.getElementsByClassName("card");
        for (let x of children)
            x.style.marginLeft = x.style.marginRight = param;

        function defineCardRowMargin(n, coef = 0) {
            return "calc((100% - (4.45vw * " + n + ")) / (2*" + n + ") - (" + coef + "vw * " + n + "))";
        }
    }

    // Allows the row to be clicked
    setSelectable() {
        this.elem.classList.add("row-selectable");
        alteraClicavel(this, true);
    }

    // Disallows the row to be clicked
    clearSelectable() {
        this.elem.classList.remove("row-selectable");
        alteraClicavel(this, false);
        for (card in this.cards)
            card.elem.classList.add("noclick");
    }

    // Returns the container to its default, empty state
    reset() {
        while (this.cards.length)
            this.removeCard(0);
        if (this.elem)
            while (this.elem.firstChild)
                this.elem.removeChild(this.elem.firstChild);
        this.cards = [];
    }

}

// Contians all used cards in the order that they were discarded
class Grave extends CardContainer {
    constructor(elem) {
        super(elem)
        elem.addEventListener("click", () => ui.viewCardsInContainer(this), false);
    }

    // Override
    addCard(card) {
        this.setCardOffset(card, this.cards.length);
        super.addCard(card, this.cards.length);
        card.destructionRound = game.roundCount;
    }

    // Override
    removeCard(card) {
        let n = isNumber(card) ? card : this.cards.indexOf(card);
        return super.removeCard(card, n);
    }

    // Override
    removeCardElement(card, index) {
        card.elem.style.left = "";
        for (let i = index; i < this.cards.length; ++i) this.setCardOffset(this.cards[i], i);
        super.removeCardElement(card, index);
    }

    // Offsets the card element in the deck
    setCardOffset(card, n) {
        card.elem.style.left = -0.03 * n + "vw";
    }
}

// Contians all special cards for a given row
class RowSpecial extends CardContainer {
    constructor(elem, row) {
        super(elem)
        this.row = row;
    }

    // Override
    addCard(card) {
        this.setCardOffset(card, this.cards.length);
        super.addCard(card, this.cards.length);
    }

    // Override
    removeCard(card) {
        let n = isNumber(card) ? card : this.cards.indexOf(card);
        if (card.removed) {
            for (let x of card.removed)
                x(card);
        }
        return super.removeCard(card, n);
    }

    // Override
    removeCardElement(card, index) {
        card.elem.style.left = "";
        for (let i = index; i < this.cards.length; ++i) this.setCardOffset(this.cards[i], i);
        super.removeCardElement(card, index);
    }

    // Offsets the card element in the deck
    setCardOffset(card, n) {
        card.elem.style.left = (1 + n) + "vw";
    }

}

// Contains a randomized set of cards to be drawn from
class Deck extends CardContainer {
    constructor(faction, elem) {
        super(elem);
        this.faction = faction;

        this.counter = document.createElement("div");
        this.counter.classList = "deck-counter center";
        this.counter.appendChild(document.createTextNode(this.cards.length));
        this.elem.appendChild(this.counter);
    }

    // Creates duplicates of cards with a count of more than one, then initializes deck
    initializeFromID(card_id_list, player) {
        this.initialize(card_id_list.reduce((a, c) => a.concat(clone(c.count, c)), []), player);

        function clone(n, elem) {
            for (var i = 0, a = []; i < n; ++i) a.push(elem);
            return a;
        }
    }

    // Populates a this deck with a list of card data and associated those cards with the owner of this deck.
    initialize(card_data_list, player) {
        this.player = player;
        for (let i = 0; i < card_data_list.length; ++i) {
            let card = new Card(card_data_list[i].index, card_dict[card_data_list[i].index], player);
            card.holder = player;
            this.addCardRandom(card);
            this.addCardElement();
        }
        this.resize();
    }

    // Override
    addCard(card) {
        this.addCardRandom(card);
        this.addCardElement();
        this.resize();
        card.currentLocation = this;
    }

    // Sends the top card to the passed hand
    async draw(hand) {
        tocar("game_buy", false);
        // In case a player draws from opponent deck
        if (hand.player && this.player !== hand.player)
            this.cards[0].holder = hand.player;
        if (hand instanceof HandAI)
            hand.addCard(this.removeCard(0));
        else
            await board.toHand(this.cards[0], this, hand);
    }

    // Draws a card and sends it to the container before adding a card from the container back to the deck.
    swap(container, card) {
        container.addCard(this.removeCard(0));
        this.addCard(card);
    }

    // Override
    addCardElement() {
        let elem = document.createElement("div");
        elem.classList.add("deck-card");
        elem.style.backgroundImage = iconURL("deck_back_" + this.faction, "jpg");
        this.setCardOffset(elem, this.cards.length - 1);
        this.elem.insertBefore(elem, this.counter);
    }

    // Override
    removeCardElement() {
        this.elem.removeChild(this.elem.children[this.cards.length]).style.left = "";
    }

    // Offsets the card element in the deck
    setCardOffset(elem, n) {
        elem.style.left = -0.03 * n + "vw";
    }

    // Override
    resize() {
        this.counter.innerHTML = this.cards.length;
        this.setCardOffset(this.counter, this.cards.length);
    }

    // Override
    reset() {
        super.reset();
        this.elem.appendChild(this.counter);
    }
}
// Hand used by computer AI. Has an offscreen HTML element for card transitions.
class HandAI extends CardContainer {
    constructor(tag) {
        super(undefined, tag);
        this.player = null;
        if (this.tag === "me") {
            this.counter = document.getElementById("hand-count-me");
            this.hidden_elem = document.getElementById("hand-me");
        } else {
            this.counter = document.getElementById("hand-count-op");
            this.hidden_elem = document.getElementById("hand-op");
        }

    }
    resize() {
        this.counter.innerHTML = this.cards.length;
    }

 
    draw(dest = null) {
        if (!this.cards || this.cards.length === 0) {
            console.warn("Se interceptó y previno un colapso en HandAI vacía durante la simulación.");
            return null;
        }
        
        let card = this.cards.pop();
        this.resize();
        
        if (dest && card) {
            card.currentLocation = dest;
            if (typeof dest.addCard === "function") {
                dest.addCard(card);
            } else if (dest.cards && Array.isArray(dest.cards)) {
                dest.cards.push(card);
            }
        }
        
        return card;
    }
}

// Hand used by current player
class Hand extends CardContainer {
    constructor(elem, tag) {
        super(elem);
        this.tag = tag;
        this.player = null;
        if (this.tag === "me") {
            this.counter = document.getElementById("hand-count-me");
        } else {
            this.counter = document.getElementById("hand-count-op");
        }
    }

    // Override
    addCard(card) {
        let i = this.addCardSorted(card);
        this.addCardElement(card, i);
        this.resize();
        card.currentLocation = this;
    }

    // Override
    resize() {
        this.counter.innerHTML = this.cards.length;
        this.resizeCardContainer(11, 0.075, .00225);
    }

    toggleDisplay() {
        if (this.elem.hidden) {
            this.elem.style.visibility = "visible";
        } else {
            this.elem.style.visibility = "hidden";
        }
        this.elem.hidden = !this.elem.hidden;
    }

    hide() {
        this.elem.style.visibility = "hidden";
    }

    show() {
        this.elem.style.visibility = "visible";
    }
}

var may_act_card = true;

// Contains active cards and effects. Calculates the current score of each card and the row.
class Row extends CardContainer {
    constructor(elem) {
        super(elem.getElementsByClassName("row-cards")[0]);
        this.elem_parent = elem;
        this.special = new RowSpecial(elem.getElementsByClassName("row-special")[0], this);
        this.total = 0;
        this.effects = {
            weather: false,
            weather_type: "",
            bond: {},
            morale: 0,
            horn: 0,
            mardroeme: 0,
            shield: 0,
            lock: 0,
            curse: 0,
            toussaint_wine: 0,
            ambush: false
        };
        this.halfWeather = false;
        this.elem.addEventListener("click", () => ui.selectRow(this), true);
        this.elem.addEventListener("mouseover", function () {
            if (hover_row) {
                tocar("card", false);
                this.style.boxShadow = "0 0 1.5vw #6d5210";
            }
        });
        this.elem.addEventListener("mouseout", function () {
            this.style.boxShadow = "0 0 0 #6d5210"
        });
        window.addEventListener("keydown", function (e) {
            if (e.keyCode == 13 && fileira_clicavel !== null && may_act_card) {
                ui.selectRow(fileira_clicavel);
                may_act_card = false;
                fileira_clicavel = null;
            }
        });
        window.addEventListener("keyup", function (e) {
            if (e.keyCode == 13) may_act_card = true;
        });
        this.special.elem.addEventListener("click", () => ui.selectRow(this, true), false, true);
    }

    // Override
    async addCard(card, runEffect = true) {
        if (card.isSpecial()) {
            this.special.addCard(card);
        } else {
            let index = this.addCardSorted(card);
            this.addCardElement(card, index);
            this.resize();
        }
        card.currentLocation = this;
        if (this.effects.curse && card.isUnit()) {
            this.effects.curse = Math.max(this.effects.curse - 1, 0);
            await card.animate("curse");
            await board.toGrave(card, this);
            let curse_card = this.special.findCard(c => c.abilities.includes("curse"));
            await board.toGrave(curse_card, this.special);
            return;
        } else if (this.effects.lock && card.isUnit() && card.abilities.length) {
            card.locked = true;
            this.effects.lock = Math.max(this.effects.lock - 1, 0);
            let lock_card = this.special.findCard(c => c.abilities.includes("lock"));
            // If several units arrive at the same time, it can be triggered several times, so we first remove the lock before doing animations
            if (lock_card)
                await board.toGrave(lock_card, this.special);
            await card.animate("lock");
        }
        // Some cards have abilities with permanent row effects - such has horn, bond or morale
        if (!runEffect && card.abilities.length > 0) {
            for (var i = 0; i < card.abilities.length; i++) {
                if ("effectAfterMove" in ability_dict[card.abilities[i]] && ability_dict[card.abilities[i]]["effectAfterMove"])
                    runEffect = true;
            }
        }
        if (runEffect && !card.isLocked()) {
            this.updateState(card, true);
            for (let x of card.placed)
                await x(card, this);
        }
        if (runEffect && this.effects.ambush) {
            let ambushCards = this.cards.filter(c => c.abilities.includes("ambush") &&
                (c.holder !== card.holder && !card.abilities.includes("spy") && !card.abilities.includes("emissary")) ||
                (c.holder === card.holder && (card.abilities.includes("spy") || card.abilities.includes("emissary")))); // Spy/Emissaries switch sides before being placed and would have triggerd when played by the owner of an ambush card
            if (ambushCards.length > 0 && ambushCards[0] !== card) {
                let targetCard = ambushCards[0];
                // Remove status first before animations to avoid triggering the ambush several times when several cards arrive at the same time
                if (ambushCards.length < 2)
                    this.effects.ambush = false;
                // Owner draws 2 cards
                await targetCard.animate("ambush");
                targetCard.holder.deck.draw(targetCard.holder.hand);
                targetCard.holder.deck.draw(targetCard.holder.hand);
                // Cards goes to the grave
                await board.toGrave(targetCard, targetCard.currentLocation);
                
            }
        }
        card.elem.classList.add("noclick");
        await sleep(600);
        //this.updateScore();
        // Let's update all rows for better accuracy
        board.updateScores();
    }

    // Override
    removeCard(card, runEffect = true) {
        // TODO: This case should no longer happen
        if (isNumber(card) && card === -1) {
            card = this.special.cards[0];
            this.special.reset();
            return card;
        }
        card = isNumber(card) ? this.cards[card] : card;
        if (card.isSpecial()) {
            this.special.removeCard(card);
        } else {
            super.removeCard(card);
            card.resetPower();
            card.locked = false;
        }
        this.updateState(card, false);
        if (runEffect) {
            // Decoy targets do no trigger the removed effect, exept for cards holding a door opened, door closes when they leave the row
            if (!card.decoyTarget || card.abilities.includes("door_o")) {
                for (let x of card.removed)
                    x(card);
            } else {
                card.decoyTarget = false;
            }

        }
        this.updateScore();
        return card;
    }

    // Override
    removeCardElement(card, index) {
        super.removeCardElement(card, index);
        let x = card.elem;
        x.style.marginLeft = x.style.marginRight = "";
        x.classList.remove("noclick");
    }

    // Updates a card's effect on the row
    updateState(card, activate) {
        for (let x of card.abilities) {
            if (!card.isLocked()) {
                switch (x) {
                    case "morale":
                    case "horn":
                    case "mardroeme":
                    case "lock":
                    case "curse":
                    case "toussaint_wine":
                        this.effects[x] += activate ? 1 : -1;
                        break;
                    case "shield":
                    case "shield_c":
                    case "shield_r":
                    case "shield_s":
                        if (activate)
                            Promise.all(this.cards.filter(c => c.isUnit()).map(c => c.animate("shield")));
                        this.effects["shield"] += activate ? 1 : -1;
                        break;
                    case "bond":
                        if (!this.effects.bond[card.target])
                            this.effects.bond[card.target] = 0;
                        this.effects.bond[card.target] += activate ? 1 : -1;
                        break;
                }
            }
        }
    }

    // Activates weather effect and visuals
    addOverlay(overlay) {
        var som = overlay == "fog" || overlay == "rain" ? overlay : overlay == "frost" ? "cold" : "";
        if (som != "") tocar(som, false);
        this.effects.weather = true;
        this.effects.weather_type = overlay;
        this.elem_parent.getElementsByClassName("row-weather")[0].classList.add(overlay);
        this.updateScore();
const canVibrate = typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';
if (canVibrate) navigator.vibrate([250, 100, 50]);
    }

    // Deactivates weather effect and visuals
    removeOverlay(overlay) {
        this.effects.weather = false;
        this.effects.weather_type = "";
        this.elem_parent.getElementsByClassName("row-weather")[0].classList.remove(overlay);
        this.updateScore();
    }

    // Override
    resize() {
        this.resizeCardContainer(10, 0.075, .00325);
    }

    // Updates the row's score by summing the current power of its cards
    updateScore() {
        let total = 0;
        for (let card of this.cards) {
            total += this.cardScore(card);
        }
        let player = this.elem_parent.parentElement.id === "field-op" ? player_op : player_me;
        player.updateTotal(total - this.total);
        this.total = total;
        this.elem_parent.getElementsByClassName("row-score")[0].innerHTML = this.total;
    }

    // Calculates and set the card's current power
    cardScore(card) {
        let total = this.calcCardScore(card);
        card.setPower(total);
        return total;
    }

    // Calculates the current power of a card affected by row affects
    calcCardScore(card) {
        if (card.key === "spe_decoy")
            return 0;
        let total = card.basePower * card.multiplier;
        if (card.hero)
            return total;
        if (card.abilities.includes("spy") || card.abilities.includes("emissary"))
            total = Math.floor(game.spyPowerMult * total);
        // Inspire - changes base strength, before weather
        if (card.abilities.includes("inspire") && !card.isLocked()) {
            let inspires = card.holder.getAllRowCards().filter(c => !c.isLocked() && c.abilities.includes("inspire"));
            if (inspires.length > 1) {
                let maxBase = inspires.reduce((a, b) => a.power > b.power ? a : b);
                total = maxBase.power;
            }
        }
        if (this.effects.weather)
            if (!(card.abilities.includes("fog_summoning") && this.effects.weather_type === "fog")) {
                if (this.halfWeather)
                    total = Math.max(Math.min(1, total), Math.floor(total / 2)); // 2 special cases, if intially 1, we want to keep one, not 0 (floor(0.5)). If 0, we want to keep 0, not 1
                else
                    total = Math.min(1, total);
            }
        // Bond
        if (card.abilities.includes("bond")) {
            let bond = this.effects.bond[card.target];
            if (isNumber(bond) && bond > 1 && !card.isLocked())
                total *= Number(bond);
        }
        // Morale
        total += Math.max(0, this.effects.morale + (card.abilities.includes("morale") ? -1 : 0));
        // Toussiant Wine
        total += Math.max(0, 3 * this.effects.toussaint_wine);
        // Witcher Schools
        if (card.abilities.at(-1) && card.abilities.at(-1).startsWith("witcher_") && !card.isLocked()) {
            let school = card.abilities.at(-1);
            if (card.holder.effects["witchers"][school]) {
                total += (card.holder.effects["witchers"][school] - 1) * 2;
            }
        }
        // Whorshipped
        if (card.abilities.includes("whorshipped") && card.holder.effects["whorshippers"] > 0 && !card.isLocked())
            total += card.holder.effects["whorshippers"] * game.whorshipBoost;
        // Horn
        if (this.effects.horn - (card.abilities.includes("horn") ? 1 : 0) > 0)
            total *= 2;
        return total;
    }

    // Applies a temporary leader horn affect that is removed at the end of the round
    async leaderHorn(card) {
        if (this.special.containsCardByKey("spe_horn"))
            return;
        let horn = new Card("spe_horn", card_dict["spe_horn"], card.holder);
        await this.addCard(horn);
        game.roundEnd.push(() => this.removeCard(horn));
    }

    // Applies a local scorch effect to this row
    async scorch() {
        if (this.total >= 10 && !this.isShielded() && !game.scorchCancelled)
            await Promise.all(this.maxUnits().map(async c => {
                await c.animate("scorch", true, false);
                await board.toGrave(c, this);
            }));
    }

    // Removes all cards and effects from this row
    clear() {
        this.special.cards.filter(c => !c.noRemove).forEach(c => board.toGrave(c, this, true));
        this.cards.filter(c => !c.noRemove).forEach(c => board.toGrave(c, this, true));
    }

    // Returns all regular unit cards with the heighest power
    maxUnits() {
        let max = [];
        for (let i = 0; i < this.cards.length; ++i) {
            let card = this.cards[i];
            if (!card.isUnit() || card.isImmortal())
                continue;
            if (!max[0] || max[0].power < card.power)
                max = [card];
            else if (max[0].power === card.power)
                max.push(card);
        }
        return max;
    }

    minUnits() {
        let min = [];
        for (let i = 0; i < this.cards.length; ++i) {
            let card = this.cards[i];
            if (!card.isUnit() || card.isImmortal())
                continue;
            if (!min[0] || min[0].power > card.power)
                min = [card];
            else if (min[0].power === card.power)
                min.push(card);
        }
        return min;
    }

    // Override
    reset() {
        super.reset();
        this.special.reset();
        this.total = 0;
        this.effects = {
            weather: false,
            bond: {},
            morale: 0,
            horn: 0,
            mardroeme: 0,
            shield: 0,
            lock: 0,
            curse: 0,
            toussaint_wine: 0,
            ambush: false
        };
    }

    // Indicates whether or not a shield is protecting that row from abilities (does not protect from weather effects though)
    isShielded() {
        return (this.effects.shield > 0);
    }

    // True if at least 1 unit and total of power >= 10
    canBeScorched() {
        if (game.scorchCancelled)
            return false;
        return (this.cards.reduce((a, c) => a + c.power, 0) >= 10) && (this.cards.filter(c => c.isUnit()).length > 0);
    }

    // Return the index of the current row in the list of rows on the board
    getRowIndex() {
        for (let i = 0; i < board.row.length; i++) {
            if (board.row[i] === this)
                return i;
        }
        return -1;
    }

    // Returns the opposite Row object - the one on the opponent's side of the field
    getOppositeRow() {
        let index = 5 - this.getRowIndex();
        if (index >= 0 && index < board.row.length)
            return board.row[index]
        return null;
    }

    // Debug/cheat - Invokes any given card to the row
    invokeCard(key) {
        let player = this.elem_parent.parentElement.id === "field-op" ? player_op : player_me;
        this.addCard(new Card(key, card_dict[key], player), true)
    }
}

// Handles how weather effects are added and removed
class Weather extends CardContainer {
    constructor(elem) {
        super(document.getElementById("weather"));
        this.types = {
            rain: {
                name: "rain",
                count: 0,
                rows: []
            },
            fog: {
                name: "fog",
                count: 0,
                rows: []
            },
            frost: {
                name: "frost",
                count: 0,
                rows: []
            }
        }
        let i = 0;
        for (let key of Object.keys(this.types))
            this.types[key].rows = [board.row[i], board.row[5 - i++]];

        this.elem.addEventListener("click", () => ui.selectRow(this), false);
    }

        // Adds a card if unique and clears all weather if 'clear weather' card added
    async addCard(card, withEffects = true) {
        super.addCard(card);
        card.elem.classList.add("noclick");
        if (!withEffects)
            return;
        // Run possible actions
        if (withEffects && !card.isLocked()) {
            for (let x of card.placed)
                await x(card, this);
        }
        if (card.key === "spe_clear") {
            let cineOverlay = document.createElement("div");
            cineOverlay.className = "sunlight-overlay-cinema";

            let solarBeam = document.createElement("div");
            solarBeam.className = "sunlight-beam-wave";

            cineOverlay.appendChild(solarBeam);
            document.body.appendChild(cineOverlay);

            setTimeout(() => {
                if (cineOverlay) cineOverlay.remove();
            }, 2000);

            tocar("clear", false);
            await sleep(500);
            this.clearWeather();
        } else {
            this.changeWeather(card, x => ++this.types[x].count === 1, (r, t) => r.addOverlay(t.name));
            for (let i = this.cards.length - 2; i >= 0; --i) {
                if (card.abilities.at(-1) === this.cards[i].abilities.at(-1)) {
                    await sleep(750);
                    await board.toGrave(card, this);
                    break;
                }
            }
        }
        await sleep(750);
    }


    // Override
    removeCard(card, withEffects = true) {
        card = super.removeCard(card);
        card.elem.classList.remove("noclick");
        if (withEffects) {
            this.changeWeather(card, x => --this.types[x].count === 0, (r, t) => r.removeOverlay(t.name));
            // Run possible actions
            if (withEffects && !card.isLocked()) {
                for (let x of card.removed) {
                    x(card, this);
                }
            }
        }
        return card;
    }

    // Checks if a card's abilities are a weather type. If the predicate is met, perfom the action
    // on the type's associated rows
    changeWeather(card, predicate, action) {
        for (let x of card.abilities) {
            if (x in this.types && predicate(x)) {
                for (let r of this.types[x].rows)
                    action(r, this.types[x]);
            }
        }
    }

    // Removes all weather effects and cards
    async clearWeather() {
        await Promise.all(this.cards.map((c, i) => this.cards[this.cards.length - i - 1]).map(c => board.toGrave(c, this)));
const canVibrate = typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';
if (canVibrate) navigator.vibrate(80);
    }

    // Override
    resize() {
        this.resizeCardContainer(4, 0.075, .045);
    }

    // Override
    reset() {
        super.reset();
        Object.keys(this.types).map(t => this.types[t].count = 0);
    }
}

// 
class Board {
    constructor() {
        this.op_score = 0;
        this.me_score = 0;
        this.row = [];
        for (let x = 0; x < 6; ++x) {
            let elem = document.getElementById((x < 3) ? "field-op" : "field-me").children[x % 3];
            this.row[x] = new Row(elem);
        }
    }

    // Get the opponent of this Player
    opponent(player) {
        return player === player_me ? player_op : player_me;
    }

    // Sends and translates a card from the source to the Deck of the card's holder
    async toDeck(card, source) {
        tocar("discard", false);
        await this.moveTo(card, "deck", source);
    }

        // Sends and translates a card from the source to the Grave of the card's holder
    async toGrave(card, source, turnEnd=false) {
        let destroy = true;
        let protectors = null;
        if (card.isUnit() && source instanceof Row) {

            // Checking Protection abilities such as Comrade
            protectors = card.holder.getAllRowCards().filter(c => c.abilities.includes("comrade") && c.protects);
            if (protectors.length > 0) {
                let choice = false;
                if (!(card.holder.controller instanceof ControllerAI)) {
                    choice = await ui.popup("Save it [E]", () => true, "Let it die [Q]", () => false, "Do you want to save this unit?", "Comrade ability can prevent the destruction of the following card: " + card.name + " (strength: " + card.power + "). Do you want to save it?");
                    if (choice) {
                        destroy = false;
                        protectors[0].protects = false;
                    }

                } else {
                    // AI saves the unit only if its value is > 5
                    if (card.power > 5) {
                        protectors[0].protects = false;
                        destroy = false;
                    }
                }
            }
            // For Wild Hunt faction: Imlerith protects navigators
            if (card.abilities.includes("door_o") && card.holder.leader.key === "wh_imlerith_general") {
                destroy = false;
            }
        }
        if (destroy) {            
            if (card && typeof card.resetPower === "function") {
                card.resetPower();
            } else if (card && card.basePower !== undefined) {
                card.power = card.basePower;
            }

            await this.moveTo(card, "grave", source);
            if (game.unitDestroyed && game.unitDestroyed.length > 0 && !turnEnd) {
                for (var i = 0; i < game.unitDestroyed.length; i++) {
                    let cb = game.unitDestroyed[i];
                    if (await cb(card))
                        game.unitDestroyed.splice(i, 1)
                }
            }
        } else {
            card.animate("comrade");
            if (protectors.length > 0)
                await protectors[0].animate("comrade");
        }
    }


    // Sends and translates a card from the source to the Hand of the card's holder
    // Possible to specify a different destination
    async toHand(card, source, dest = null) {
        await this.moveTo(card, dest ? dest : "hand", source);
    }

    // Sends and translates a card from the source to Weather
    async toWeather(card, source) {
        await this.moveTo(card, weather, source);
    }

    // Sends and translates a card from the source to the Deck of the card's combat row
    async toRow(card, source) {
        let row = ["close", "agile", "agile_cr", "agile_cs", "agile_crs"].includes(card.row) ? "close" : ["ranged", "agile_rs"].includes(card.row) ? "ranged" : card.row ? card.row : "close";
        await this.moveTo(card, row, source);
    }

    // Sends and translates a card from the source to a specified row name or CardContainer
    async moveTo(card, dest, source = null) {
        if (isString(dest)) dest = this.getRow(card, dest);
        try {
            cartaNaLinha(dest.elem.id, card);
        } catch (err) { }
        await translateTo(card, source ? source : null, dest);

        if (dest instanceof Row || dest instanceof Weather)
            await dest.addCard(source ? source.removeCard(card) : card); //Only the override in the Row/Weather classes are asynchronous
        else
            dest.addCard(source ? source.removeCard(card) : card);
    }

    // Sends and translates a card from the source to a specified row name or CardContainer - NO EFFECTS/ABILITIES
    async moveToNoEffects(card, dest, source = null) {
        if (isString(dest)) dest = this.getRow(card, dest);
        try {
            cartaNaLinha(dest.elem.id, card);
        } catch (err) { }
        await translateTo(card, source ? source : null, dest);
        if (dest instanceof Row || dest instanceof Weather)
            await dest.addCard(source ? source.removeCard(card, false) : card, false); //Only the override in the Row/Weather classes are asynchronous
        else
            dest.addCard(source ? source.removeCard(card) : card);
    }

    // Sends and translates a card from the source to a row name associated with the passed player
    async addCardToRow(card, row_name, player, source) {
        let row;
        if (row_name instanceof Row) {
            row = row_name;
        } else {
            row = this.getRow(card, row_name, player);
        }
        try {
            cartaNaLinha(row.elem.id, card);
        } catch (err) { }
        await translateTo(card, source, row);
        await row.addCard(card);
    }

    // Returns the Card associated with the row name that the card would be sent to
    getRow(card, row_name, player) {
        player = player ? player : card ? card.holder : player_me;
        let isMe = player === player_me;
        let isSpy = (card.abilities.includes("spy") || card.abilities.includes("emissary") || card.abilities.includes("ambush"));
        switch (row_name) {
            case "weather":
                return weather;
                break;
            case "close":
                return this.row[isMe ^ isSpy ? 3 : 2];
            case "ranged":
                return this.row[isMe ^ isSpy ? 4 : 1];
            case "siege":
                return this.row[isMe ^ isSpy ? 5 : 0];
            case "grave":
                return player.grave;
            case "deck":
                return player.deck;
            case "hand":
                return player.hand;
            default:
                console.error(card.name + " sent to incorrect row \"" + row_name + "\" by " + card.holder.name);
        }
    }

    // Return the list of rows possible for the given card
    getAgileRows(card, player) {
        switch (card.row) {
            case "agile":
            case "agile_cr":
                return [board.getRow(card, "close", player), board.getRow(card, "ranged", player)];
            case "agile_cs":
                return [board.getRow(card, "close", player), board.getRow(card, "siege", player)];
            case "agile_rs":
                return [board.getRow(card, "ranged", player), board.getRow(card, "siege", player)];
            case "agile_crs":
                return [board.getRow(card, "close", player), board.getRow(card, "ranged", player), board.getRow(card, "siege", player)];
            default:
                return [board.getRow(card, card.row, player)];
        }
    }

    // Updates which player currently is in the lead
    updateLeader() {
        let dif = player_me.total - player_op.total;
        player_me.setWinning(dif > 0);
        player_op.setWinning(dif < 0);
    }

    updateScores() {
        //this.row.map(r => r.cards.map(c => r.cardScore(c)));
        this.row.map(r => r.updateScore());
    }
}

function limpar() {
    fileira_clicavel = null;
    load_pass = load_passT;
    may_pass1 = false;
    may_pass2 = "";
    may_pass3 = true;
    timer2 = null;
    lCard = null;
}

class Game {
    constructor() {
        this.endScreen = document.getElementById("end-screen");
        let buttons = this.endScreen.getElementsByTagName("button");
        this.customize_elem = buttons[0];
        this.replay_elem = buttons[1];
        this.customize_elem.addEventListener("click", () => this.returnToCustomization(), false);
        this.replay_elem.addEventListener("click", () => this.restartGame(), false);
        this.reset();
        this.randomOPDeck = true;
        this.mode = 1;
    }

    reset() {
        this.firstPlayer;
        this.currPlayer = null;

        this.gameStart = [];
        this.roundStart = [];
        this.roundEnd = [];
        this.turnStart = [];
        this.turnEnd = [];
        this.unitDestroyed = [];

        this.roundCount = 0;
        this.roundHistory = [];
        this.over = false;

        this.randomRespawn = false;
        this.medicCount = 1;
        this.whorshipBoost = 1;
        this.spyPowerMult = 1;
        this.decoyCancelled = false;
        this.scorchCancelled = false;

        // Also resetting some board/row properties affected during the course of a game
        if (board) {
            if (board.row) {
                board.row.forEach(r => {
                    r.halfWeather = false;
                });
            }
        }

        weather.reset();
        board.row.forEach(r => r.reset());
    }

    // Sets up player faction abilities and psasive leader abilities
    initPlayers(p1, p2) {
        let l1 = ability_dict[p1.leader.abilities[0]];
        let l2 = ability_dict[p2.leader.abilities[0]];
        let special_abilities = {
            meve_white_queen: false
        };
        initLeader(p1, l1);
        initLeader(p2, l2);
        if (l1 === ability_dict["meve_white_queen"] || l2 === ability_dict["meve_white_queen"])
            special_abilities["meve_white_queen"] = true;
        if (p1.deck.faction === p2.deck.faction && p1.deck.faction === "scoiatael")
            return special_abilities;
        initFaction(p1);
        initFaction(p2);

        function initLeader(player, leader) {
            if (leader.placed)
                leader.placed(player.leader);
            Object.keys(leader).filter(key => game[key]).map(key => game[key].push(leader[key]));
        }

        function initFaction(player) {
            //Only passive faction abilities
            if (factions[player.deck.faction] && factions[player.deck.faction].factionAbility && !factions[player.deck.faction].activeAbility)
                factions[player.deck.faction].factionAbility(player);
        }

        return special_abilities;
    }

    // Sets initializes player abilities, player hands and redraw
    async startGame() {
if (typeof window !== "undefined" && window.Website2APK && typeof window.Website2APK.vibrate === "function") {
			window.Website2APK.vibrate(150); 
		} else if (navigator.vibrate) {
			navigator.vibrate(150);
		}
        ui.toggleMusic_elem.classList.remove("music-customization");
actualizarPosicionMusicaMovel();
        var special_abilities = this.initPlayers(player_me, player_op);
        await Promise.all([...Array(10).keys()].map(async () => {
            await player_me.deck.draw(player_me.hand);
            await player_op.deck.draw(player_op.hand);
        }));

        await this.runEffects(this.gameStart);
        if (!this.firstPlayer)
            this.firstPlayer = await this.coinToss();
        if (special_abilities["meve_white_queen"]) await ui.notification("meve_white_queen", 1200);
        this.initialRedraw();
        somCarta();
    }

    // Simulated coin toss to determine who starts game
    async coinToss() {
        this.firstPlayer = (Math.random() < 0.5) ? player_me : player_op;
        await ui.notification(this.firstPlayer.tag + "-coin", 1200);
        return this.firstPlayer;
    }

    // Allows the player to swap out up to two cards from their iniitial hand
    async initialRedraw() {
        if (player_op.controller instanceof ControllerAI) {
            if (player_op.leader.key === "sc_francesca_daisy") {
                let cards = player_op.controller.discardOrder(player_op.leader, player_op.hand, true).splice(0, player_op.mulliganCount);
                cards.forEach(c => {
                    board.toDeck(c, player_op.hand);
                });
            } else {
                for (let i = 0; i < player_op.mulliganCount; i++)
                    player_op.controller.redraw();
            }
        }
        if (player_me.controller instanceof ControllerAI) {
            if (player_me.leader.key === "sc_francesca_daisy") {
                let cards = player_me.controller.discardOrder(player_me.leader, player_me.hand, true).splice(0, player_me.mulliganCount);
                cards.forEach(c => {
                    board.toDeck(c, player_me.hand);
                });
            } else {
                for (let i = 0; i < player_me.mulliganCount; i++)
                    player_me.controller.redraw();
            }
        } else {
            // player vs player - both have a redraw - player 1 first
            if (this.mode === 3) {
                if (player_me.leader.key === "sc_francesca_daisy") {
                    await ui.queueCarousel(player_me.hand, player_me.mulliganCount, async (c, i) => await board.toDeck(c.cards[i], c), c => true, true, false, "Player 1 - Choose " + player_me.mulliganCount +" cards to put back to deck.");
                } else {
                    await ui.queueCarousel(player_me.hand, player_me.mulliganCount, async (c, i) => await player_me.deck.swap(c, c.removeCard(i)), c => true, true, true, "Player 1 - Choose up to " + player_me.mulliganCount +" cards to redraw.");
                }
                if (player_op.leader.key === "sc_francesca_daisy") {
                    await ui.queueCarousel(player_op.hand, player_op.mulliganCount, async (c, i) => await board.toDeck(c.cards[i], c), c => true, true, false, "Player 2 - Choose " + player_op.mulliganCount +" cards to put back to deck.");
                } else {
                    await ui.queueCarousel(player_op.hand, player_op.mulliganCount, async (c, i) => await player_op.deck.swap(c, c.removeCard(i)), c => true, true, true, "Player 2 - Choose up to " + player_op.mulliganCount +" cards to redraw.");
                }
            } else {
                if (player_me.leader.key === "sc_francesca_daisy") {
                    await ui.queueCarousel(player_me.hand, player_me.mulliganCount, async (c, i) => await board.toDeck(c.cards[i], c), c => true, true, false, "Choose " + player_me.mulliganCount +" cards to put back to deck.");
                } else {
                    await ui.queueCarousel(player_me.hand, player_me.mulliganCount, async (c, i) => await player_me.deck.swap(c, c.removeCard(i)), c => true, true, true, "Choose up to " + player_me.mulliganCount +" cards to redraw.");
                }
            }
            ui.enablePlayer(false);
        }
        game.startRound();
    }

    // Initiates a new round of the game
    async startRound(verdict = false) {
        this.roundCount++;
        if (verdict && verdict.winner) {
            //Last round winner starts the round, verdict.winner can be null if draw
            this.currPlayer = verdict.winner.opponent();
        } else {
            this.currPlayer = (this.roundCount % 2 === 0) ? this.firstPlayer : this.firstPlayer.opponent();
        }
        player_me.roundStartReset();
        player_op.roundStartReset();

        await this.runEffects(this.roundStart);

        board.row.map(r => r.updateScore());

        if (!player_me.canPlay())
            player_me.setPassed(true);
        if (!player_op.canPlay())
            player_op.setPassed(true);

        if (player_op.passed && player_me.passed)
            return this.endRound();

        if (this.currPlayer.passed)
            this.currPlayer = this.currPlayer.opponent();

        await ui.notification("round-start", 1200);
        if (this.currPlayer.opponent().passed)
            await ui.notification(this.currPlayer.tag + "-turn", 1200);

        this.startTurn();
    }

    // Starts a new turn. Enables client interraction in client's turn.
    async startTurn() {
        await this.runEffects(this.turnStart);
        if (!this.currPlayer.opponent().passed) {
            this.currPlayer = this.currPlayer.opponent();
            await ui.notification(this.currPlayer.tag + "-turn", 1200);
        }
        ui.enablePlayer(this.currPlayer === player_me);
        // Player vs player - hide opponent's hand
        if (game.isPvP()) {
            this.currPlayer.opponent().hand.hide();
            this.currPlayer.hand.show();
        }
        this.currPlayer.startTurn();
    }

    // Ends the current turn and may end round. Disables client interraction in client's turn.
    async endTurn(noEffects=false) {
        if (this.currPlayer === player_me)
            ui.enablePlayer(false);

   if (this.currPlayer && this.currPlayer.passed) {
            noEffects = true;
        }     

if (!noEffects)
            await this.runEffects(this.turnEnd);
        // Player might have "end turn" events which delay the actual end of the turn
        if (this.currPlayer.endturn_action) {
            // Call action instead of ending turn
            await this.currPlayer.endturn_action();
            return;
        }
        if (this.currPlayer.passed)
            await ui.notification(this.currPlayer.tag + "-pass", 1200);
        board.updateScores();
        if (player_op.passed && player_me.passed)
            this.endRound();
        else
            this.startTurn();
    }

    // Ends the round and may end the game. Determines final scores and the round winner.
    async endRound() {
        limpar();

        // Clean and update scores
        board.row.forEach(r => {
            r.cards.forEach(c => {
                if (c.temporaryPower)
                    c.basePower = c.originalBasePower;
            });
            r.updateScore();
        });
        board.updateScores();
        let dif = player_me.total - player_op.total;
        if (dif === 0) {
            let nilf_me = player_me.deck.faction === "nilfgaard",
                nilf_op = player_op.deck.faction === "nilfgaard";
            dif = nilf_me ^ nilf_op ? nilf_me ? 1 : -1 : 0;
        }
        let winner = dif > 0 ? player_me : dif < 0 ? player_op : null;
        let verdict = {
            winner: winner,
            score_me: player_me.total,
            score_op: player_op.total
        }
        this.roundHistory.push(verdict);

        await this.runEffects(this.roundEnd);

        player_me.endRound(dif > 0);
        player_op.endRound(dif < 0);
        if (player_me.health === 0 || player_op.health === 0)
            this.over = true;

        weather.clearWeather();
        // In case some cards stay on the board, we want to reset their power
        board.row.forEach(row => {
            row.clear();
            row.cards.forEach(c => {
                c.power = c.basePower;
            });
        });
// Validación de seguridad para la API de vibración
		const canVibrate = typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';

        if (dif > 0) {
if (canVibrate) navigator.vibrate([100, 50, 100]);
            await ui.notification("win-round", 1200);
        } else if (dif < 0) {
            if (nilfgaard_wins_draws) {
                nilfgaard_wins_draws = false;
                await ui.notification("nilfgaard-wins-draws", 1200);
            }
if (canVibrate) navigator.vibrate(400);
            await ui.notification("lose-round", 1200);
        } else {
if (canVibrate) navigator.vibrate(200);
            await ui.notification("draw-round", 1200);
}
        if (player_me.health === 0 || player_op.health === 0)
            this.endGame();
        else
            this.startRound(verdict);
    }

    // Sets up and displays the end-game screen
    async endGame() {
        this.over = true;
        let endScreen = document.getElementById("end-screen");
        let rows = endScreen.getElementsByTagName("tr");
        rows[1].children[0].innerHTML = player_me.name;
        rows[2].children[0].innerHTML = player_op.name;

        for (let i = 1; i < 4; ++i) {
            let round = this.roundHistory[i - 1];
            rows[1].children[i].innerHTML = round ? round.score_me : 0;
            rows[1].children[i].style.color = round && round.winner === player_me ? "goldenrod" : "";

            rows[2].children[i].innerHTML = round ? round.score_op : 0;
            rows[2].children[i].style.color = round && round.winner === player_op ? "goldenrod" : "";
        }
const canVibrate = typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';
        endScreen.children[0].className = "";
        if (player_op.health <= 0 && player_me.health <= 0) {
            tocar("");
if (canVibrate) navigator.vibrate([200, 100, 200]);  
            endScreen.getElementsByTagName("p")[0].classList.remove("hide");
            endScreen.children[0].classList.add("end-draw");
        } else if (player_op.health === 0) {
            tocar("game_win", true);
if (canVibrate) navigator.vibrate([150, 100, 150, 100, 300]); 
            endScreen.children[0].classList.add("end-win");
        } else {
            tocar("game_lose", true);
if (canVibrate) navigator.vibrate(1000); 
            endScreen.children[0].classList.add("end-lose");
        }

        fadeIn(endScreen, 300);
        ui.enablePlayer(true);
    }

    // Returns the client to the deck customization screen
    returnToCustomization() {
        iniciarMusica();
        this.reset();
        player_me.reset();
        player_op.reset();
        ui.toggleMusic_elem.classList.add("music-customization");
actualizarPosicionMusicaMovel();
        this.endScreen.classList.add("hide");
        document.getElementById("deck-customization").classList.remove("hide");
    }

    // Restarts the last game with the same decks
    restartGame() {
        iniciarMusica();
        limpar();
        this.reset();
        player_me.reset();
        player_op.reset();
        this.endScreen.classList.add("hide");
        this.startGame();
    }

    // Executes effects in list. If effect returns true, effect is removed.
    async runEffects(effects) {
        for (let i = effects.length - 1; i >= 0; --i) {
            let effect = effects[i];
            if (await effect())
                effects.splice(i, 1)
        }
    }

    isPvP() {
        return (this.mode === 3);
    }

}

// Contians information and behavior of a Card
class Card {

    constructor(key, card_data, player) {
        if (!card_data) {
            console.log("Invalid card data for: " + key);
        }
        this.id;
        if (card_data.id)
            this.id = Number(card_data.id);
        this.key = key;
        this.name = card_data.name;
        this.basePower = this.power = Number(card_data.strength);
        this.faction = card_data.deck;
        // To clean the field in case it is a faction specific weather/special card
        if (this.faction.startsWith("weather") || this.faction.startsWith("special")) {
            this.faction = this.faction.split(" ")[0];
        }
        this.abilities = (card_data.ability === "") ? [] : card_data.ability.split(" ");
        this.row = (this.faction === "weather") ? this.faction : card_data.row;
        this.targetRows = (this.faction === "weather") ? card_data.row : "";
        this.filename = card_data.filename;
        this.faceUp = true;
        this.placed = [];
        this.removed = [];
        this.activated = [];
        this.holder = player;
        this.locked = false;
        this.decoyTarget = false;
        this.target = "";
        this.currentLocation = board; // By default, updated later
        this.temporaryPower = false;
        this.multiplier = 1;
        if ("target" in card_data) {
            this.target = card_data.target;
        }
        this.quote = "";
        if ("quote" in card_data) {
            this.quote = card_data.quote;
        }
        this.meta = [];
        if ("meta" in card_data) {
            if (Array.isArray(card_data.meta)) {
                this.meta = card_data.meta;
            } else {
                this.meta = card_data.meta.split(" ");
            }
        }

        this.hero = false;
        if (this.abilities.length > 0) {
            if (this.abilities[0] === "hero") {
                this.hero = true;
                this.abilities.splice(0, 1);
            }
            for (let x of this.abilities) {
                let ab = ability_dict[x];
                if ("placed" in ab) this.placed.push(ab.placed);
                if ("removed" in ab) this.removed.push(ab.removed);
                if ("activated" in ab) this.activated.push(ab.activated);
            }
        }

        if (this.row === "leader")
            this.desc_name = "Leader Ability";
        else if (this.abilities.length > 0) {
            this.desc_name = ability_dict[this.abilities[this.abilities.length - 1]].name;
            if (this.abilities.length > 1)
                this.desc_name += " / " + ability_dict[this.abilities[this.abilities.length - 2]].name;
        } else if (this.row === "agile" || this.row === "agile_cr")
            this.desc_name = "Agile Close / Ranged";
        else if (this.row === "agile_cs")
            this.desc_name = "Agile Close / Siege";
        else if (this.row === "agile_rs")
            this.desc_name = "Agile Ranged / Siege";
        else if (this.row === "agile_crs")
            this.desc_name = "Agile Close / Ranged / Siege";
        else if (this.hero)
            this.desc_name = "Hero";
        else
            this.desc_name = "";

        this.desc = this.row.includes("agile") ? "<p><b>Agile:</b> " + ability_dict[this.row].description + "</p>" : "";
        for (let i = this.abilities.length - 1; i >= 0; --i) {
            let abi_name = (ability_dict[this.abilities[i]].name ? ability_dict[this.abilities[i]].name : "Leader Ability");
            let faction_abi_desc = "description_" + this.faction;
            if (ability_dict[this.abilities[i]][faction_abi_desc]) {
                // If there is a faction specific description/behaviour
                this.desc += "<p><b>" + abi_name + " (" + factions[this.faction].name + "):</b> " + ability_dict[this.abilities[i]][faction_abi_desc] + "</p>";
            } else {
                this.desc += "<p><b>" + abi_name + ":</b> " + ability_dict[this.abilities[i]].description + "</p>";
            }
            
        }
        // If Summon Avenger or Invoke card, give information about the card being summoned
        if (this.abilities.includes("avenger") && this.target) {
            let target = card_dict[this.target];
            this.desc += "<p>Summons <b>" + target["name"] + "</b> with strength " + target["strength"];
            if (target["ability"].length > 0)
                this.desc += " and abilities " + target["ability"].split(" ").map(a => ability_dict[a]["name"]).join(" / ");
            this.desc += "</p>";
        } else if (this.abilities.includes("muster") && this.target) {
            let units = Object.keys(card_dict).filter(cid => card_dict[cid].target === this.target).map(cid => card_dict[cid]);
            let units_summary = {};
            units.forEach(function (u) {
                let key = "<b>" + u.name + "</b> (str: " + u.strength + ")";
                if (!(key in units_summary))
                    units_summary[key] = 0;
                units_summary[key] = units_summary[key] + 1;
            });
            this.desc += "<p><u>Summons</u> " + Object.keys(units_summary).map(t => units_summary[t] + " * " + t).join(", ");

        } else if (this.abilities.includes("invoke") && this.target) {
            let target = Object.keys(card_dict).filter(cid => card_dict[cid].target === this.target && cid !== this.key).map(cid => card_dict[cid]);
            if (target.length > 0) {
                target = target[0];
                this.desc += "<p>Invokes <b>" + target["name"] + "</b> with strength " + target["strength"];
                if (target["ability"].length > 0)
                    this.desc += " and abilities " + target["ability"].split(" ").map(a => ability_dict[a]["name"]).join(" / ");
                this.desc += "</p>";
            }
        } else if ((this.abilities.includes("berserker") || this.abilities.includes("monster_toussaint")) && this.target) {
            let target = card_dict[this.target];
            this.desc += "<p>Turns into <b>" + target["name"] + "</b> with strength " + target["strength"];
            if (target["ability"].length > 0)
                this.desc += " and abilities " + target["ability"].split(" ").map(a => ability_dict[a]["name"]).join(" / ");
            this.desc += "</p>";
        }
        if (this.hero)
            this.desc += "<p><b>Hero:</b> " + ability_dict["hero"].description + "</p>";

        this.elem = this.createCardElem(this);
        this.faceUpElem = this.elem;
        this.faceDownElem = null;
    }

    // Returns the identifier for this type of card
    getId() {
        return this.key;
    }

    // Sets and displays the current power of this card
    setPower(n) {
        if (this.key === "spe_decoy")
            return;
 if (!this.elem || !this.elem.children[0] || !this.elem.children[0].children[0]) {
           this.power = n; 
            return;
        }

        let elem = this.elem.children[0].children[0];
        if (n !== this.power) {
            this.power = n;
            elem.innerHTML = this.power;
        }
       elem.style.color = (n > this.basePower) ? "goldenrod" : (n < this.basePower) ? "red" : "";
        if (this.temporaryPower)
            elem.style.color = "green";
    }

    // Resets the power of this card to default
    resetPower() {
        this.setPower(this.basePower);
        this.multiplier = 1;
    }

    // Automatically sends and translates this card to its apropriate row from the passed source
    async autoplay(source) {
        await board.toRow(this, source);
    }

    // Animates an ability effect
    async animate(name, bFade = true, bExpand = true) {
        if (!may_pass1 && playingOnline) await sleep(600);
        var guia = {
            "medic": "med",
            "muster": "ally",
            "morale": "moral",
            "bond": "moral"
        }
        var temSom = new Array();
        for (var x in guia) temSom[temSom.length] = x;
        var literais = ["scorch", "spy", "horn", "shield", "lock", "seize", "knockback", "resilience", "curse", "immortal", "aerondight", "ambush", "necrophage", "comrade", "emissary", "invoke","monster_toussaint"];
        var som = literais.indexOf(name) > -1 ? literais[literais.indexOf(name)] : temSom.indexOf(name) > -1 ? guia[name] : "";
        if (som != "") tocar(som, false);
        if (name === "scorch") {
            return await this.scorch(name);
        }
if (name === "hero") {
			return await this.animateHeroEffect(name);
		}
        let anim = this.elem.children[this.elem.children.length - 1];
        anim.style.backgroundImage = iconURL("anim_" + name);
        await sleep(50);

        if (bFade) fadeIn(anim, 300);
        if (bExpand) anim.style.backgroundSize = "100% auto";
        await sleep(300);

        if (bExpand) anim.style.backgroundSize = "80% auto";
        await sleep(1000);

        if (bFade) fadeOut(anim, 300);
        if (bExpand) anim.style.backgroundSize = "40% auto";
        await sleep(300);

        anim.style.backgroundImage = "";
    }

    // Animates the scorch effect
    async scorch(name) {
        let anim = this.elem.children[this.elem.children.length - 1];
        anim.style.backgroundSize = "cover";
        anim.style.backgroundImage = iconURL("anim_" + name);
        await sleep(50);

        fadeIn(anim, 300);
        await sleep(1300);

        fadeOut(anim, 300);
        await sleep(300);

        anim.style.backgroundSize = "";
        anim.style.backgroundImage = "";
    }

// Animates the hero spawn effect 
	async animateHeroEffect(name) {
		let anim = this.elem.children[this.elem.children.length-1];
		anim.style.backgroundSize = "cover"; 
		anim.style.backgroundImage = iconURL("anim_" + name); 
		await sleep(20);

		fadeIn(anim, 250);   
		await sleep(200);  
		fadeOut(anim, 200);  
		await sleep(150);

		anim.style.backgroundSize = "";
		anim.style.backgroundImage = "";
	}

    // Returns true if this is a combat card that is not a Hero
    isUnit() {
        return !this.hero && (this.row === "close" || this.row === "ranged" || this.row === "siege" || this.row.includes("agile"));
    }

    // Returns true if card is sent to a Row's special slot
    isSpecial() {
        return ["spe_horn", "spe_mardroeme", "spe_sign_quen", "spe_sign_yrden", "spe_toussaint_wine", "spe_lyria_rivia_morale", "spe_wyvern_shield", "spe_mantlet", "spe_garrison", "spe_dimeritium_shackles", "spe_curse"].includes(this.key);
    }

    // Compares by type then power then name
    static compare(a, b) {
        var dif = factionRank(a) - factionRank(b);
        if (dif !== 0)
            return dif;
        // Muster/Bond cards
        if (a.target && b.target && a.target === b.target) {
            if (a.id && b.id)
                return Number(a.id) - Number(b.id);
            if (a.key && b.key)
                return a.key.localeCompare(b.key);
        }
        dif = a.basePower - b.basePower;
        if (dif && dif !== 0)
            return dif;

        return a.name.localeCompare(b.name);

        function factionRank(c) {
            return c.faction === "special" ? -2 : (c.faction === "weather") ? -1 : 0;
        }
    }

    getPlayableRows() {
        if (this.row.includes("agile")) {
            return board.getAgileRows(this, this.holder);
        } else if (this.isSpecial()) {
            return this.getAllRows();
        }
        return [board.getRow(this, this.row, this.holder)];
    }

            createCardElem(card) {
        let elem = document.createElement("div");
        elem.style.backgroundImage = smallURL(card.faction + "_" + card.filename);
        elem.classList.add("card");
        elem.addEventListener("click", () => ui.selectCard(card), false);

        if (card.row === "leader")
            return elem;

        let power = document.createElement("div");
        elem.appendChild(power);
        let bg;
        if (card.hero) {
            bg = "power_hero";
            elem.classList.add("hero");
        } else if (card.faction === "weather") {
            bg = "power_" + card.abilities[0];
        } else if (card.faction === "special") {
            let str = card.abilities[0];
            if (str === "shield_c" || str === "shield_r" || str === "shield_s")
                str = "shield";
            bg = "power_" + str;
            elem.classList.add("special");
        } else {
            bg = "power_normal";
        }
        power.style.backgroundImage = iconURL(bg);

        let row = document.createElement("div");
        elem.appendChild(row);
        if (card.row === "close" || card.row === "ranged" || card.row === "siege" || card.row.includes("agile")) {
            let num = document.createElement("div");
            num.appendChild(document.createTextNode(card.basePower));
            num.classList.add("center");
            power.appendChild(num);
            
            // --- TRADUCTOR DE ABREVIATURAS PARA TUS IMÁGENES PNG ---
            let rowName = card.row;
            if (card.row.includes("agile")) {
                if (card.row === "agile_close_ranged" || card.row === "agile_cr") {
                    rowName = "agile_cr";
                } else if (card.row === "agile_close_ranged_siege" || card.row === "agile_crs") {
                    rowName = "agile_crs";
                } else if (card.row === "agile_close_siege" || card.row === "agile_cs") {
                    rowName = "agile_cs";
                } else if (card.row === "agile_ranged_siege" || card.row === "agile_rs") {
                    rowName = "agile_rs";
                } else {
                    rowName = "agile";
                }
            }
            row.style.backgroundImage = iconURL("card_row_" + rowName);
        } else if (card.faction === "weather" && card.targetRows.length > 0) {
            row.style.backgroundImage = iconURL("card_row_" + card.targetRows);
        }

        let abi = document.createElement("div");
        abi.classList.add("card-ability");
        elem.appendChild(abi);
        if (card.faction !== "special" && card.faction !== "weather" && card.abilities.length > 0) {
            let str = card.abilities[card.abilities.length - 1];
            if (str === "cerys")
                str = "muster";
            if (str.startsWith("avenger"))
                str = "avenger";
            if (str === "scorch_c" || str == "scorch_r" || str === "scorch_s")
                str = "scorch_combat";
            if (str === "shield_c" || str == "shield_r" || str === "shield_s")
                str = "shield";

            
if (str && card.faction !== "faction") {
                abi.style.backgroundImage = iconURL("card_ability_" + str);
            }
        } else if (card.row && card.row.includes("agile")) {
            abi.style.backgroundImage = iconURL("card_ability_agile");
        }
        
        if (card.abilities.length > 1) {
            let abi2 = document.createElement("div");
            abi2.classList.add("card-ability-2");
            elem.appendChild(abi2);
            let str = card.abilities[card.abilities.length - 2];
            if (str === "cerys")
                str = "muster";
            if (str.startsWith("avenger"))
                str = "avenger";
            if (str === "scorch_c" || str == "scorch_r" || str === "scorch_s")
                str = "scorch_combat";
            if (str === "shield_c" || str == "shield_r" || str === "shield_s")
                str = "shield";
            abi2.style.backgroundImage = iconURL("card_ability_" + str);
        }

        elem.appendChild(document.createElement("div"));
        return elem;
    }



    createCardBackElem() {
        let elem = document.createElement("div");
        elem.classList.add("card");
        let f = this.faction;
        if (f == "special") {
            f = this.holder.leader.faction;
            elem.classList.add("special");
        }
        elem.style.backgroundImage = iconURL("deck_back_" + f, "jpg");
        return elem;
    }

    flip() {
        if (this.faceUp) {
            if (!this.faceDownElem) {
                this.faceDownElem = this.createCardBackElem();
                if (this.faceUpElem.style.left)
                    this.faceDownElem.style.left = this.faceUpElem.style.left;
            }
            this.elem.replaceWith(this.faceDownElem);
            this.elem = this.faceDownElem;
        } else {
            this.elem.replaceWith(this.faceUpElem);
            this.elem = this.faceUpElem;
            if (this.faceDownElem.style.left)
                this.faceUpElem.style.left = this.faceDownElem.style.left;
        }
        this.faceUp = !this.faceUp;
    }

    // Indicates whether or not the abilities of this card are locked
    isLocked() {
        return this.locked;
    }

    isImmortal() {
        return this.abilities.includes("immortal");
    }
}

function passBreak() {
    clearInterval(timer2);
    load_pass = load_passT;
    may_pass2 = "";
    document.getElementById("pass-button").innerHTML = original;
}

function passStart(input) {
    if (may_pass1 && may_pass2 == "") {
        may_pass2 = input;
        ui.passLoad();
        timer2 = setInterval(function () {
            ui.passLoad();
        }, 750);
    }
}

var original = "Pass";
var fileira_clicavel = null;
const load_passT = 3;
var cache_notif = ["op-leader"];
var load_pass = load_passT,
    may_pass1 = false,
    may_pass2 = "",
    may_pass3 = true,
    fimU = false,
    carta_c = false,
    hover_row = true,
    timer2, lCard;

// Handles notifications and client interration with menus
class UI {
    constructor() {
        this.carousels = [];
        this.notif_elem = document.getElementById("notification-bar");
        this.preview = document.getElementsByClassName("card-preview")[0];
        this.previewCard = null;
        this.lastRow = null;
        this.underRearrangement = false;
        this.underCardPowerEdit = false;
        this.arrangementMoves = 0;
        if (!isMobile()) {
            document.getElementById("pass-button").addEventListener("mousedown", function (e) {
                if (e.button == 0) {
                    passStart("mouse");
                    may_pass3 = false;
                } else if (may_pass2 == "mouse") passBreak();
            });
            document.getElementById("pass-button").addEventListener("mouseup", () => {
                if (may_pass2 == "mouse") passBreak();
            }, false);
            document.getElementById("pass-button").addEventListener("mouseout", () => {
                if (may_pass2 == "mouse") passBreak();
            }, false);

let giveupBtn = document.getElementById("giveup-button");
            if (giveupBtn) {
                giveupBtn.onclick = async () => {
                    if (typeof ui !== "undefined" && ui.isBlocked && ui.isBlocked()) return;
                    tocar("pass", false);
                    if (typeof player_me !== "undefined") player_me.health = 0;
                    if (typeof game !== "undefined" && game.roundHistory) {
                        var verdict = { winner: null, score_me: player_me.total, score_op: player_op.total };
                        game.roundHistory.push(verdict);
                    }
                    if (typeof game !== "undefined" && typeof game.endGame === "function") await game.endGame();
                    else if (typeof ui !== "undefined" && typeof ui.showEndScreen === "function") await ui.showEndScreen(player_op);
                };
            }

            window.addEventListener("keydown", function (e) {
                switch (e.keyCode) {
                    case 81:
                        e.preventDefault();
                        try {
                            ui.cancel();
                        } catch (err) { }
                        break;
                    case 32:
                        if (may_pass3) passStart("keyboard");
                        break;
                }
            });
            window.addEventListener("keyup", function (e) {
                if (e.keyCode == 32 && may_pass1) {
                    may_pass3 = true;
                    if (may_pass2 == "keyboard") passBreak();
                }
            });
        } else {
document.getElementById("pass-button").addEventListener("click", function (e) {
            if (game.isPvP()) {
                game.currPlayer.passRound();
            } else {
                player_me.passRound();
            }
        });

let giveupBtnMobile = document.getElementById("giveup-button");
            if (giveupBtnMobile) {
                giveupBtnMobile.addEventListener("click", async function (e) {
                    tocar("pass", false);
                    if (typeof player_me !== "undefined") player_me.health = 0;
                    if (typeof game !== "undefined" && game.roundHistory) {
                        var verdict = { winner: null, score_me: player_me.total, score_op: player_op.total };
                        game.roundHistory.push(verdict);
                    }
                    if (typeof game !== "undefined" && typeof game.endGame === "function") await game.endGame();
else if (typeof ui !== "undefined" && typeof ui.showEndScreen === "function") await ui.showEndScreen(player_op);
                });
            }
        }

        document.getElementById("click-background").addEventListener("click", () => ui.cancel(), false);
        this.toggleMusic_elem = document.getElementById("toggle-music");
        this.toggleMusic_elem.classList.add("fade");

        document.getElementById("arrangementWindow-button").addEventListener("click", () => {
            this.updateArrangementCounter(0);
            this.underRearrangement = false;
            game.currPlayer.endTurn();

        }, false);

        this.helper = new HelperBox();
	if (isMobile && typeof isMobile === "function" && isMobile()) {


			let deckCustomElement = document.getElementById("deck-customization");
			if (deckCustomElement && deckCustomElement.style) {
				deckCustomElement.style.transform = "translateY(-2.4vw)"; 


let cardArrays = document.querySelectorAll(".card-array");
				cardArrays.forEach(arrayBox => {
					if (arrayBox) {
						arrayBox.style.transform = "translateY(-1.8vw)";
					}
				});

let cardLeaderMenu = document.getElementById("card-leader");
				if (cardLeaderMenu) {
					cardLeaderMenu.style.transform = "translateY(-1.0vw)";
				}

				let deckStatsBox = document.getElementById("deck-stats");
				if (deckStatsBox) {
					deckStatsBox.style.transform = "translateY(-2.9vw)";
				}

				let startGameBtn = document.getElementById("start-game");
				if (startGameBtn) {
					startGameBtn.style.transform = "translateY(-5.9vw)";
				}

				let startAIGameBtn = document.getElementById("start-ai-game");
				if (startAIGameBtn) {
					startAIGameBtn.style.display = "none";
				}
let startPvPGameBtn = document.getElementById("start-pvp-game");
				if (startPvPGameBtn) {
					startPvPGameBtn.style.display = "none";
				}


			}
						
			if (typeof actualizarPosicionMusicaMovel === "function") {
				actualizarPosicionMusicaMovel();
			}
			
			let leaderMe = document.getElementById("leader-me");
			if (leaderMe) {
				leaderMe.style.transform = "translateY(-4.5vw)"; 
				leaderMe.style.transformOrigin = "bottom center";
			}
			
			let statsMe = document.getElementById("stats-me");
			if (statsMe) {
				statsMe.style.transform = "translateY(-3.5vw)"; 
			}
			
			let scoreTotalMe = document.getElementById("score-total-me");
			if (scoreTotalMe) {
				scoreTotalMe.style.transform = "translateY(3.5vw)"; 
			}
			
			let passBtn = document.getElementById("pass-button");
			if (passBtn) {
				passBtn.style.transform = "translateY(-5.0vw)"; 
			}
			
			let giveupBtn = document.getElementById("giveup-button");
			if (giveupBtn) {
				giveupBtn.style.transform = "translateY(-5.5vw)"; 
			}

			let weatherContainer = document.getElementById("weather");
			if (weatherContainer) {
				weatherContainer.style.transform = "translateY(-1.2vw)";
			}

			let fieldHand = document.getElementById("field-hand");
			if (fieldHand) {
				fieldHand.style.transform = "translateY(-2.7vw)"; 
				fieldHand.style.zIndex = "80"; 
			}
			
			let handRow = document.getElementById("hand-row");
			if (handRow) {
				handRow.style.transform = "scale(0.92) translateY(-1.5vw)";
				handRow.style.transformOrigin = "bottom center";
			}

			let deckMe = document.getElementById("deck-me");
			if (deckMe) {
				deckMe.style.transform = "translateY(-4.2vw)"; 
			}
			
			let graveMe = document.getElementById("grave-me");
			if (graveMe) {
				graveMe.style.transform = "translateY(-4.2vw)"; 
			}

			let boardElement = document.getElementById("board");
			if (!boardElement) {
				let mainTags = document.getElementsByTagName("main");
				if (mainTags && mainTags.length > 0) {
					boardElement = mainTags[0];
				}
			}
			
			if (boardElement) {
				 
				boardElement.style.backgroundImage = "url('img/board-mobile.jpg')";
				boardElement.style.backgroundSize = "100% 100%";
				boardElement.style.backgroundRepeat = "no-repeat";
			}
			let estiloQuotesMovel = document.createElement("style");
			estiloQuotesMovel.innerHTML = `
				.card-array .card-large-quote {
					top: 82% !important;
					font-size: 11px !important;
					line-height: 0.85 !important;
					transform: scale(0.47) !important;
					transform-origin: top center !important;
					width: 180% !important;
					left: -40% !important;
				}
				.card-array .card-large-name {
					top: 73.9% !important;
					font-size: 13px !important;
					line-height: 0.9 !important;
					transform: scale(0.50) !important;
					transform-origin: top center !important;
					width: 180% !important;
					left: -40% !important;
				}
				#card-leader .card-large-name {                                
					top: 74.2% !important;				
					font-size: 13px !important;
					line-height: 1 !important;
					transform: scale(0.52) !important;
					transform-origin: top center !important;
					width: 180% !important;
					left: -40% !important;
				}
                               #carousel .card-large-name {
					top: 74.2% !important;
					font-size: 15px !important;
					line-height: 0.9 !important;
					transform: scale(0.58) !important;
					transform-origin: top center !important;
					width: 170% !important;
					left: -35% !important;
				}
                                #carousel {
					top: -30px !important;
				}
                                #carousel .card-large-quote {
					top: 82% !important;
				}
				.card-preview .card-lg {
					top: 2.5vw !important;
				}
				.card-preview .card-description {
					top: 32.5vw !important;
                                transform: scale(0.95) !important;
				}
				#carousel .card-description {
					top: 74% !important;
                                font-size: 11px !important;
					line-height: 0.83 !important;
					transform: scale(0.82) !important;
					transform-origin: top center !important;
					}
#button_start {
       margin-top: -43px !important;
}
#end-screen button {
    margin: -6.5% -1% 0;
    }
              
html, body, #click-background {
	overflow: hidden !important;
 }

#field-me {
	top: -3.3% !important;
}

#field-op {
	top: -1.5% !important;
	transform: none !important;
}

#f5 {
	transform: translateY(-0.25vw) !important;
}


#f6 {
	transform: translateY(-0.5vw) !important;
}

.drop-container {	
	display: flex !important;
	flex-direction: column !important;
	justify-content: center !important;
	height: 100vh !important;	
}

.drop-targets {
	height: auto !important;
	max-height: 125px !important;
	min-height: unset !important;
	margin-top: 2px !important;
	margin-bottom: 2px !important;
}

#drop-bank, #drop-deck-top, #drop-deck-bottom {
	transform: scale(0.78) !important;
	transform-origin: center center !important;
	max-width: 122% !important;
	margin-left: -11% !important;
	margin-right: -11% !important;
	justify-content: space-around !important;
}

.drop-line-title {
	line-height: 1 !important;
	text-align: center !important;
	margin-bottom: 1px !important;
}

			`;
			document.head.appendChild(estiloQuotesMovel);
			
			if (typeof actualizarPosicionMusicaMovel === "function") {
				actualizarPosicionMusicaMovel();
			}         
		}

    }

    passLoad() {
        load_pass--;
        if (load_pass == -1) {
            document.getElementById("pass-button").innerHTML = original;
            load_pass = load_passT;
            if (game.isPvP()) {
                game.currPlayer.passRound();
            } else {
                player_me.passRound();
            }
            passBreak();
        } else document.getElementById("pass-button").innerHTML = load_pass + 1;
    }

    // Enables or disables client interration
    enablePlayer(enable) {
        // Player vs player
        if (game.isPvP()) {
            document.getElementsByTagName("main")[0].classList.remove("noclick");
        } else {
            let main = document.getElementsByTagName("main")[0].classList;
            if (enable) main.remove("noclick");
            else main.add("noclick");
        }
    }

   
    // Called when the player selects a selectable card
    async selectCard(card) {
        let row = this.lastRow;
        let pCard = this.previewCard;
        if (this.underRearrangement) {
            this.showPreviewVisuals(card);
            return;
        }
        if (this.underCardPowerEdit) {
            if (this.previewCard == null) {
                this.showPreviewVisuals(card);
                ui.editCardPower(card);
            }
            return;
        }
        if (card === pCard)
            return;
        if (pCard === null || card.holder.hand.cards.includes(card)) {
            this.setSelectable(null, false);
            this.showPreview(card);
        } else if (pCard.abilities.includes("decoy")) {
            this.hidePreview(card);
            this.enablePlayer(false);
            card.decoyTarget = true;
            board.toHand(card, row);
            await board.moveTo(pCard, row, pCard.holder.hand);
            await pCard.holder.endTurn();
        } else if (pCard.abilities.includes("alzur_maker")) {
            this.hidePreview(card);
            this.enablePlayer(false);
            await board.toGrave(card, row);
            let target = new Card(ability_dict["alzur_maker"].target, card_dict[ability_dict["alzur_maker"].target], card.holder);
            //target.removed.push(() => setTimeout(() => target.holder.grave.removeCard(target), 1001));
            await board.addCardToRow(target, target.row, card.holder);
            await pCard.holder.endTurn();
        }
    }

    // Called when the player selects a selectable CardContainer
    async selectRow(row, isSpecial = false) {
        this.lastRow = row;
        if (this.underRearrangement) {
            if (this.previewCard !== null) {
                if (row !== this.previewCard.currentLocation) {
                    board.moveToNoEffects(this.previewCard, row, this.previewCard.currentLocation);
                    this.updateArrangementCounter(this.arrangementMoves - 1);
                }
                this.preview.classList.add("hide");
                let holder = this.previewCard.holder;
                this.previewCard = null;
                this.lastRow = null;
                if (this.arrangementMoves < 1) {
                    this.underRearrangement = false;
                    ui.helper.hide();
                    await holder.endTurn();
                }
            }
            return;
        }
        if (this.underCardPowerEdit)
            return;
        if (this.previewCard === null) {
            if (isSpecial)
                await ui.viewCardsInContainer(row.special);
            else
                await ui.viewCardsInContainer(row);
            return;
        }
        if (this.previewCard.key === "spe_decoy" || this.previewCard.abilities.includes("alzur_maker"))
            return;
        if (this.previewCard.abilities.includes("decoy") && row.cards.filter(c => c.isUnit()).length > 0)
            return; // If a unit can be selected, we cannot select the whole row
        let card = this.previewCard;
        let holder = card.holder;
        this.hidePreview();
        this.enablePlayer(false);
        if (card.faction === "special" && card.abilities.includes("scorch")) {
            this.hidePreview();
            if (game.scorchCancelled)
                return;
            await ability_dict["scorch"].activated(card);
        } else if (card.faction === "special" && card.abilities.includes("cintra_slaughter")) {
            this.hidePreview();
            await ability_dict["cintra_slaughter"].activated(card);
        } else if (card.faction === "special" && card.abilities.includes("seize")) {
            this.hidePreview();
            await ability_dict[card.abilities.at(-1)].activated(card);
        } else if (card.faction === "special" && card.abilities.includes("knockback")) {
            this.hidePreview();
            await ability_dict[card.abilities.at(-1)].activated(card, row);
        } else if (card.key === "spe_decoy" || card.abilities.includes("alzur_maker")) {
            return;
        } else if (card.abilities.includes("decoy") && row.cards.filter(c => c.isUnit()).length > 0) {
            return; // If a unit can be selected, we cannot select the whole row
        } else if (card.abilities.includes("anna_henrietta_duchess")) {
            this.hidePreview(card);
            this.enablePlayer(false);
            let horn = row.special.cards.filter(c => c.abilities.includes("horn"))[0];
            if (horn)
                await board.toGrave(horn, row);
        } else if (card.key === "spe_lyria_rivia_morale") {
            await board.moveTo(card, row);
        } else if (card.abilities.includes("meve_princess") || card.abilities.includes("carlo_varese")) {
            this.hidePreview(card);
            this.enablePlayer(false);
            if (game.scorchCancelled)
                return;
            await row.scorch();
        } else if (card.abilities.includes("cyrus_hemmelfart")) {
            this.hidePreview(card);
            this.enablePlayer(false);
            let new_card = new Card("spe_dimeritium_shackles", card_dict["spe_dimeritium_shackles"], card.holder);
            await board.moveTo(new_card, row);
        } else if (card.faction === "special" && card.abilities.includes("bank")) {
            this.hidePreview();
            await ability_dict["bank"].activated(card);
        } else if (card.faction === "special" && card.abilities.includes("skellige_fleet")) {
            this.hidePreview();
            await ability_dict["skellige_fleet"].activated(card);
        } else if (card.faction === "special" && card.abilities.includes("royal_decree")) {
            this.hidePreview();
            await ability_dict["royal_decree"].activated(card);
        } else {
            await board.moveTo(card, row, card.holder.hand);
        }
        await holder.endTurn();
    }

    // Called when the client cancels out of a card-preview
    cancel() {
        if (!fimU) {
            fimU = true;
            tocar("discard", false);
            lCard = null;
            exibindo_lider = false;
            carta_c = false;
            this.hidePreview();
        }
    }

    // Displays a card preview then enables and highlights potential card destinations
    showPreview(card) {
        fimU = false;
        tocar("explaining", false);
        this.showPreviewVisuals(card);
        this.setSelectable(card, true);
        document.getElementById("click-background").classList.remove("noclick");
    }

    // Sets up the graphics and description for a card preview
    showPreviewVisuals(card) {
        this.previewCard = card;
        this.preview.classList.remove("hide");
        getPreviewElem(this.preview.getElementsByClassName("card-lg")[0], card)
        this.preview.getElementsByClassName("card-lg")[0].addEventListener("mousedown", function () {
            if (fileira_clicavel !== null && may_act_card) {
                ui.selectRow(fileira_clicavel);
                may_act_card = false;
                fileira_clicavel = null;
            }
        });
        this.preview.getElementsByClassName("card-lg")[0].addEventListener("mouseup", function () {
            may_act_card = true;
        });
        let desc_elem = this.preview.getElementsByClassName("card-description")[0];
        this.setDescription(card, desc_elem);
    }

    // Hides the card preview then disables and removes highlighting from card destinations
    hidePreview() {
        document.getElementById("click-background").classList.add("noclick");
        player_me.hand.cards.forEach(c => c.elem.classList.remove("noclick"));

        this.preview.classList.add("hide");
        this.setSelectable(null, false);
        this.previewCard = null;
        this.lastRow = null;
    }

      // Sets up description window for a card
    setDescription(card, desc) {
        if (card.hero || (card.row && card.row.includes("agile")) || card.abilities.length > 0 || card.faction === "faction") {
            desc.classList.remove("hide");
            let str = (card.row && card.row.includes("agile")) ? card.row : "";
            if (card.abilities.length)
                str = card.abilities[card.abilities.length - 1];
            if (str === "cerys")
                str = "muster";
            if (str.startsWith("avenger"))
                str = "avenger";
            if (str === "scorch_c" || str == "scorch_r" || str === "scorch_s")
                str = "scorch_combat";
            if (str === "shield_c" || str == "shield_r" || str === "shield_s")
                str = "shield";

            if (card.faction === "faction" || (card.abilities.length === 0 && card.row !== "agile"))
                desc.children[0].style.backgroundImage = "";
            else if (card.row === "leader")
                desc.children[0].style.backgroundImage = iconURL("deck_shield_" + card.faction);
            // CORRECCIÓN: Si la habilidad coincide con el nombre de un clima, dejamos el contenedor de imagen limpio
            else if (str === "white_frost" || str === "biting_frost" || str === "impenetrable_fog" || str === "torrential_rain" || str === "skellige_storm" || str === "clear_weather")
                desc.children[0].style.backgroundImage = "";
            else if (str && str !== "")
                desc.children[0].style.backgroundImage = iconURL("card_ability_" + str);
            else
                desc.children[0].style.backgroundImage = "";

            desc.children[1].innerHTML = card.desc_name;
            desc.children[2].innerHTML = card.desc;
        } else {
            desc.classList.add("hide");
        }
    }


    // Displayed a timed notification to the client
    async notification(name, duration) {
const canVibrate = typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';

if (canVibrate) {

if (name === "op-leader" || name === "op-white-flame" || name === "toussaint-decoy-cancelled" || name === "meve_white_queen" || name === "north-scorch-cancelled") {
navigator.vibrate([200, 100, 200]); 
			}

else if (name === "monsters" || name === "skellige-me" || name === "skellige-op" || name === "north" || name === "scoiatael" || name === "toussaint" || name === "lyria_rivia" || name === "zerrikania" || name === "witcher_universe" || name === "redania" || name === "velen") {
navigator.vibrate([150, 80, 150]); 
			}
			
else if (name === "me-turn") {
navigator.vibrate(50); 
 }
}
        var guia1 = {
            "notif-nilfgaard-wins-draws": "Nilfgaard wins draws",
            "notif-op-white-flame": "The opponent's leader cancel your opponent's Leader Ability",
            "notif-op-leader": "Opponent uses leader",
            "notif-me-first": "You will go first",
            "notif-op-first": "Your opponent will go first",
            "notif-me-coin": "You will go first",
            "notif-op-coin": "Your opponent will go first",
            "notif-round-start": "Round Start",
            "notif-me-pass": "Round passed",
            "notif-op-pass": "Your opponent has passed",
            "notif-win-round": "You won the round!",
            "notif-lose-round": "Your opponent won the round",
            "notif-draw-round": "The round ended in a draw",
            "notif-me-turn": "Your turn!",
            "notif-op-turn": "Opponent's turn",
            "notif-north": "Northern Realms faction ability triggered - North draws an additional card.",
            "notif-monsters": "Monsters faction ability triggered - monsters retake one card to their hand",
            "notif-scoiatael": "Opponent used the Scoia'tael faction perk to go first.",
            "notif-skellige-op": "Opponent Skellige Ability Triggered!",
            "notif-skellige-me": "Skellige Ability Triggered!",
            "notif-witcher_universe": "Witcher Universe used its faction ability and skipped a turn",
            "notif-toussaint": "Toussaint faction ability triggered - Toussaint draws an additional card.",
            "notif-toussaint-decoy-cancelled": "Toussaint Leader ability used - Decoy ability cancelled for the rest of the round.",
            "notif-lyria_rivia": "Lyria & Rivia ability used - Morale Boost effect applied to a row.",
            "notif-meve_white_queen": "Lyria & Rivia leader allows both players to restore 2 units when using the medic ability.",
            "notif-north-scorch-cancelled": "Northern Realms Leader ability used - Scorch ability cancelled for the rest of the round.",
            "notif-zerrikania": "Zerrikania ability used - Unit restored from discard pile.",
            "notif-redania": "Redania used its faction ability and skipped a turn",
            "notif-velen": "Velen ability triggered: Player will draw a card"
        }
        var guia2 = {
            "me-pass": "pass",
            "win-round": "round_win",
            "lose-round": "round_lose",
            "me-turn": "turn_me",
            "op-turn": "turn_op",
            "op-leader": "turn_op",
            "op-white-flame": "turn_op",
            "nilfgaard-wins-draws": "turn_op"
        }
        var temSom = new Array();
        for (var x in guia2) temSom[temSom.length] = x;
        var som = temSom.indexOf(name) > -1 ? guia2[name] : name == "round-start" && game.roundHistory.length == 0 ? "round1_start" : "";
        if (som != "") tocar(som, false);
 var textoNotif = guia1["notif-" + name];
        if (!textoNotif) return;
        this.notif_elem.children[0].id = "notif-" + name;
        this.notif_elem.children[0].style.backgroundImage = name == "op-leader" ? "url(img/icons/notif_" + player_op.deck.faction + ".png)" : "";
                var textoNotif = guia1[this.notif_elem.children[0].id] || "Action not allowed";
        var caracteres = textoNotif.length;
        var palavras = textoNotif.split(" ").length;
        duration = parseInt(0.7454878 * Math.max(parseInt((1e3 / 17) * caracteres), parseInt((6e4 / 300) * palavras)) + 211.653152) + 1;

        const fadeSpeed = 150;
        fadeIn(this.notif_elem, fadeSpeed);
        var ch = playingOnline && duration < 1000 & cache_notif.indexOf(name) == -1 ? 800 : 0;
        cache_notif[cache_notif.length] = name;
        duration += ch;
        let d = new Date().getTime();
        fadeOut(this.notif_elem, fadeSpeed, duration - fadeSpeed - 50); // Removing some delay to avoid weird behaviours if the fadeOut starts late and has not ended when the next fadeIn starts
        await sleep(duration);
    }

    // Displays a cancellable Carousel for a single card 
    async viewCard(card, action) {
        if (card === null) return;
        if (lCard !== card.name) {
            lCard = card.name;
            let container = new CardContainer();
            container.cards.push(card);
            await this.viewCardsInContainer(container, action);
        }
    }

    // Displays a cancellable Carousel for all cards in a container
    async viewCardsInContainer(container, action) {
        action = action ? action : function () {
            return this.cancel();
        };
        await this.queueCarousel(container, 1, action, () => true, false, true);
    }

    // Displays a Carousel menu of filtered container items that match the predicate.
    // Suspends gameplay until the Carousel is closed. Automatically picks random card if activated for AI player
    async queueCarousel(container, count, action, predicate, bSort, bQuit, title) {
        /*if (game.currPlayer && game.currPlayer.controller instanceof ControllerAI) {
            for (let i = 0; i < count; ++i) {
                let cards = container.cards.reduce((a, c, i) => !predicate || predicate(c) ? a.concat([i]) : a, []);
                await action(container, cards[randomInt(cards.length)]);
            }
            return;
        }*/
        let carousel = new Carousel(container, count, action, predicate, bSort, bQuit, title);
        if (Carousel.curr === undefined || Carousel.curr === null) {
            carousel.start();
        } else {
            this.carousels.push(carousel);
            return;
        }
        await sleepUntil(() => this.carousels.length === 0 && !Carousel.curr, 100);
    }

    // Starts the next queued Carousel
    quitCarousel() {
        if (this.carousels.length > 0) {
            this.carousels.shift().start();
        }
    }

    // Displays a custom confirmation menu 
    async popup(yesName, yes, noName, no, title, description) {
        let p = new Popup(yesName, yes, noName, no, title, description);
        await sleepUntil(() => !Popup.curr);
        return p.choice;
    }

    // Displays a custom menu to select a number
    async numberPopup(v, min, max, callback, title, description) {
        let p = new NumberValuePopup(v, min, max, callback, title, description);
        await sleepUntil(() => !NumberValuePopup.curr);
        return parseInt(p.value);
    }

    async startDeckSorter(cards, player, action, title, bottomAllowed = false) {
        let deckSorter = new DeckSorter(cards, player, action, title, bottomAllowed);
        deckSorter.start();
        await sleepUntil(() => deckSorter.isCompleted(), 100);
    }

    // Enables or disables selection and highlighting of rows specific to the card
    setSelectable(card, enable) {
        if (!enable) {
            for (let row of board.row) {
                row.elem.classList.remove("row-selectable");
                row.elem.classList.remove("noclick");
                row.special.elem.classList.remove("row-selectable");
                row.special.elem.classList.remove("noclick");
                alteraClicavel(row, false);

                for (let card of row.cards) {
                    card.elem.classList.add("noclick");
                }
            }
            weather.elem.classList.remove("row-selectable");
            weather.elem.classList.remove("noclick");
            alteraClicavel(weather, false);
            return;
        }
        if (card.faction === "weather") {
            for (let row of board.row) {
                row.elem.classList.add("noclick");
                row.special.elem.classList.add("noclick");
            }
            weather.elem.classList.add("row-selectable");
            carta_c = true;
            document.getElementById("field-op").addEventListener("click", function () {
                cancelaClima();
            });
            document.getElementById("field-me").addEventListener("click", function () {
                cancelaClima();
            });
            alteraClicavel(weather, true);
            return;
        }

        weather.elem.classList.add("noclick");

        // Affects all board
        if (card.faction === "special" && card.abilities.includes("scorch")) {
            for (let r of board.row) {
                if (r.isShielded() || game.scorchCancelled) {
                    r.elem.classList.add("noclick");
                    r.special.elem.classList.add("noclick");
                } else {
                    r.elem.classList.add("row-selectable");
                    r.special.elem.classList.add("row-selectable");
                    alteraClicavel(r, true);
                }
            }
            return;
        }
        // Affects only own side of board
        if (card.faction === "special" && (card.abilities.includes("cintra_slaughter") || card.abilities.includes("bank") || card.abilities.includes("skellige_fleet") || card.abilities.includes("royal_decree"))) {
            for (let i = 0; i < 6; i++) {
                let r = board.row[i];
                if ((!game.isPvP() && i > 2) || (game.isPvP() && ((card.holder.tag === player_me.tag && i > 2) || (card.holder.tag === player_op.tag && i < 3)))) {
                    r.elem.classList.add("row-selectable");
                    r.special.elem.classList.add("row-selectable");
                    alteraClicavel(r, true);
                }
            }
            return;
        }
        // Affects enemy side of the board
        // Affects only opponent melee and ranged row
        if (card.faction === "special" && card.abilities.includes("knockback")) {
            let rows = [1, 2];
            if (game.isPvP() && card.holder.tag === player_op.tag) {
                rows = [3, 4];
            }
            for (let i of rows) { 
                let r = board.row[i];
                if (!r.isShielded()) {
                    r.elem.classList.add("row-selectable");
                    r.special.elem.classList.add("row-selectable");
                    alteraClicavel(r, true);
                }
            }
            return;
        }
        // Affects only opponent melee row
        if (card.faction === "special" && card.abilities.includes("seize")) {
            let r = board.row[2];
            if (game.isPvP() && card.holder.tag === player_op.tag) {
                r = board.row[3];
            }
            if (!r.isShielded()) {
                r.elem.classList.add("row-selectable");
                r.special.elem.classList.add("row-selectable");
                alteraClicavel(r, true);
            }
            return;
        }
        //Affects only own rows that are available
        if (card.isSpecial()) {
            for (let i = 0; i < 6; i++) {
                let r = board.row[i];
                //Affects OP side
                if (card.abilities.includes("lock")) {
                    if (r.special.containsCardByKey(card.key) || r.isShielded() || (!game.isPvP() && i > 2) ||
                        (game.isPvP() && ((card.holder.tag === player_me.tag && i > 2) || (card.holder.tag === player_op.tag && i < 3)))) {
                        r.elem.classList.add("noclick");
                        r.special.elem.classList.add("noclick");
                    } else {
                        r.special.elem.classList.add("row-selectable");
                        fileira_clicavel = null;
                    }
                } else if (card.abilities.includes("curse")) {
                    //Affects both sides
                    if (r.isShielded()) {
                        r.elem.classList.add("noclick");
                        r.special.elem.classList.add("noclick");
                    } else {
                        r.special.elem.classList.add("row-selectable");
                        fileira_clicavel = null;
                    }

                } else if (card.abilities.includes("shield_c") || card.abilities.includes("shield_r") || card.abilities.includes("shield_s")) {
                    if (((card.abilities.includes("shield_c") && i == 3) || (card.abilities.includes("shield_r") && i == 4) || (card.abilities.includes("shield_s") && i == 5)) &&
                        (!game.isPvP() || (game.isPvP() && card.holder.tag === player_me.tag))) {
                        r.special.elem.classList.add("row-selectable");
                        fileira_clicavel = null;
                    } else if ((game.isPvP() && card.holder.tag === player_op.tag && ((card.abilities.includes("shield_c") && i == 2) || (card.abilities.includes("shield_r") && i == 1) || (card.abilities.includes("shield_s") && i == 0)))) { } else {
                        r.elem.classList.add("noclick");
                        r.special.elem.classList.add("noclick");
                    }
                } else {
                    // Affects own side - Toussaint Wine does not affect siege row
                    if (r.special.containsCardByKey(card.key) || (!game.isPvP() && ((card.abilities.includes("toussaint_wine") && i == 5) || i < 3)) ||
                        (game.isPvP() && ((card.holder.tag === player_me.tag && ((card.abilities.includes("toussaint_wine") && i == 5) || i < 3)) ||
                            (card.holder.tag === player_op.tag && ((card.abilities.includes("toussaint_wine") && i == 0) || i > 2))))) {
                        r.elem.classList.add("noclick");
                        r.special.elem.classList.add("noclick");
                    } else {
                        r.special.elem.classList.add("row-selectable");
                        fileira_clicavel = null;
                    }
                }

            }
            return;
        }

        if (card.abilities.includes("decoy") || card.abilities.includes("alzur_maker")) {
            for (let i = 0; i < 6; i++) {
                let r = board.row[i];
                let units = r.cards.filter(c => c.isUnit());
                if ((card.key === "spe_decoy" && units.length === 0) || (card.abilities.includes("decoy") && game.decoyCancelled) || (!game.isPvP() && i < 3) ||
                    (game.isPvP() && ((card.holder.tag === player_me.tag && i < 3) || (card.holder.tag === player_op.tag && i > 2)))) {
                    r.elem.classList.add("noclick");
                    r.special.elem.classList.add("noclick");
                    r.elem.classList.remove("card-selectable");
                } else {
                    // For unit cards with Decoy ability, filter by the appropriate row
                    if (card.abilities.includes("decoy") && card.row.length > 0) {
                        if (((!game.isPvP() || (game.isPvP() && card.holder.tag === player_me.tag)) && ((i === 3 && ["close", "agile", "agile_cr", "agile_cs", "agile_crs"].includes(card.row)) || (i === 4 && ["ranged", "agile", "agile_cr", "agile_rs", "agile_crs"].includes(card.row)) || (i === 5 && ["siege", "agile_cs", "agile_rs", "agile_crs"].includes(card.row)))) ||
                            (game.isPvP() && card.holder.tag === player_op.tag && ((i === 2 && ["close", "agile", "agile_cr", "agile_cs", "agile_crs"].includes(card.row)) || (i === 1 && ["ranged", "agile", "agile_cr", "agile_rs", "agile_crs"].includes(card.row)) || (i === 0 && ["siege", "agile_cs", "agile_rs", "agile_crs"].includes(card.row))))) {
                            r.elem.classList.add("row-selectable");
                            // Row is selectable if it contains no unit to select, in order to play the unit itself without its effect
                            if (units.length === 0)
                                r.elem.classList.remove("noclick");
                            alteraClicavel(r, true);
                            units.forEach(c => c.elem.classList.remove("noclick"));
                        } else {
                            r.elem.classList.add("noclick");
                            r.special.elem.classList.add("noclick");
                            r.elem.classList.remove("card-selectable");
                        }
                    } else {
                        r.elem.classList.add("row-selectable");
                        alteraClicavel(r, true);
                        units.forEach(c => c.elem.classList.remove("noclick"));
                    }

                }
            }
            return;
        }

        if (card.abilities.includes("anna_henrietta_duchess")) {
            let rows = [0, 1, 2];
            if (game.isPvP() && card.holder.tag === player_op.tag) {
                rows = [3, 4, 5];
            }
            for (i of rows) {
                let r = board.row[i];
                if (r.effects.horn > 0) {
                    r.elem.classList.add("row-selectable");
                    alteraClicavel(r, true);
                } else {
                    r.elem.classList.add("noclick");
                    r.special.elem.classList.add("noclick");
                    r.elem.classList.remove("card-selectable");
                }
            }
            return;
        }

        // Target only enemy rows
        if (card.abilities.includes("meve_princess") || card.abilities.includes("carlo_varese")) {
            let rows = [0, 1, 2];
            if (game.isPvP() && card.holder.tag === player_op.tag) {
                rows = [3, 4, 5];
            }
            for (i of rows) {
                let r = board.row[i];
                if (r.isShielded() || !r.canBeScorched()) {
                    r.elem.classList.add("noclick");
                    r.special.elem.classList.add("noclick");
                    r.elem.classList.remove("card-selectable");
                } else {
                    r.elem.classList.add("row-selectable");
                    alteraClicavel(r, true);
                }
            }
            return;
        }

        // Play special card on any opponent row, provided it doesn't already have one
        if (card.abilities.includes("cyrus_hemmelfart")) {
            let rows = [0, 1, 2];
            if (game.isPvP() && card.holder.tag === player_op.tag) {
                rows = [3, 4, 5];
            }
            for (i of rows) {
                let r = board.row[i];
                if (r.containsCardByKey("spe_dimeritium_shackles") || r.isShielded()) {
                    r.elem.classList.add("noclick");
                    r.special.elem.classList.add("noclick");
                    r.elem.classList.remove("card-selectable");
                } else {
                    r.elem.classList.add("row-selectable");
                    alteraClicavel(r, true);
                }
            }
            return;
        }

        

        let currRows = card.row.includes("agile") ? board.getAgileRows(card, card.holder) : [board.getRow(card, card.row, card.holder)];
        for (let i = 0; i < 6; i++) {
            let row = board.row[i];
            if (currRows.includes(row)) {
                row.elem.classList.add("row-selectable");
                if (!card.row.includes("agile")) alteraClicavel(row, true);
                else fileira_clicavel = null;
            } else if (card.abilities.includes("ambush") && currRows.includes(row.getOppositeRow())) { 
                // Ambush cards are symetrical, they affect available rows on each side of the battlefield
                row.elem.classList.add("row-selectable");
            } else {
                row.elem.classList.add("noclick");
            }
        }

    }

    // Make UI enter a mode where the player can re-arrange the cards on one side of the board (the one associated to the provided player)
    // In this mode, when a player clicks a card, it displays the preview
    // When the player clicks a row when a preview is displayed, move the card there (unless it was already there) and decrease remaining moves by one
    enableBoardRearrangement(player,moves) {
        if (this.underRearrangement)
            return;
        this.underRearrangement = true;
        this.updateArrangementCounter(moves);
        this.setSelectable(null, false);
        let rows = (player === player_op) ? board.row.slice(0, 3) : board.row.slice(3);
        player.hand.cards.forEach(c => c.elem.classList.add("noclick"));
        for (let i = 0; i < 6; i++) {
            let row = board.row[i];
            //Valid side of board
            if (rows.includes(row) ) {
                row.elem.classList.remove("noclick");
                if (row.cards.length > 0) {
                    alteraClicavel(row, true);
                    row.cards.filter(c => c.key !== "spe_decoy").forEach(c => c.elem.classList.remove("noclick"));
                }
            // Other side of board    
            } else {
                row.elem.classList.add("noclick");
                row.cards.forEach(c => c.elem.classList.add("noclick"));
            }
            
        }
        ui.helper.showMessage("Select cards on the board to re-arrange.");
        this.enablePlayer(true);
    }

    updateArrangementCounter(cnt) {
        if (cnt > 0) {
            this.arrangementMoves = cnt;
            document.getElementById("arrangementWindow").classList.remove("hide");
            document.getElementById("arrangementWindow-counter").innerText = cnt;
        } else {
            this.arrangementMoves = 0;
            document.getElementById("arrangementWindow").classList.add("hide");
        }
    }

    enableCardPowerEdit(player) {
        if (this.underCardPowerEdit || !player.capabilities["cardEdit"] || player.capabilities["cardEdit"] < 1)
            return;
        this.underCardPowerEdit = true;
        this.setSelectable(null, false);
        let rows = (player === player_op) ? board.row.slice(0, 3) : board.row.slice(3);
        player.hand.cards.forEach(c => c.elem.classList.add("noclick"));
        for (let i = 0; i < 6; i++) {
            let row = board.row[i];
            //Valid side of board
            if (rows.includes(row)) {
                row.elem.classList.remove("noclick");
                if (row.cards.length > 0) {
                    alteraClicavel(row, true);
                    row.cards.filter(c => c.hero || c.isUnit()).forEach(c => c.elem.classList.remove("noclick"));
                }
                // Other side of board    
            } else {
                row.elem.classList.add("noclick");
                row.cards.forEach(c => c.elem.classList.add("noclick"));
            }
        }
        // Prevent the end of turn while selecting cards
        player.endturn_action = async () => {
            player.endturn_action = null;
        }
        ui.helper.showMessage("Select a card on your side of the board.");
        this.enablePlayer(true);
    }

    async editCardPower(card) {
        ui.helper.hide();
        let newValue = await this.numberPopup(card.power, 0, 999, null, "Select a new base power", "Select the new base power (before other effects) for the selected card. Currently: " + String(card.power));
        if (!card.originalBasePower)
            card.originalBasePower = card.basePower;
        card.basePower = newValue;
        card.temporaryPower = true;
        card.holder.capabilities["cardEdit"] -= 1;
        this.underCardPowerEdit = false;
        this.preview.classList.add("hide");
        this.previewCard = null;
        card.holder.hand.cards.forEach(c => c.elem.classList.remove("noclick"));
        card.holder.endTurn(true);
    }
}

var fimC = false;

// Displays up to 5 cards for the client to cycle through and select to perform an action
// Clicking the middle card performs the action on that card "count" times
// Clicking adejacent cards shifts the menu to focus on that card
class Carousel {
    constructor(container, count, action, predicate, bSort, bExit = false, title) {
        if (count <= 0 || !container || !action || container.cards.length === 0)
            return;
        this.container = container;
        this.count = count;
        this.action = action ? action : () => this.cancel();
        this.predicate = predicate;
        this.bSort = bSort;
        this.indices = [];
        this.index = 0;
        this.bExit = bExit;
        this.title = title;
        this.cancelled = false;
        this.selection = [];

        if (!Carousel.elem) {
            Carousel.elem = document.getElementById("carousel");
if (Carousel.elem && Carousel.elem.children.length > 0) {
				Carousel.elem.children[0].addEventListener("click", () => Carousel.curr.cancel(), false);
			}
            window.addEventListener("keydown", function (e) {
                if (e.keyCode == 81) {
                    e.preventDefault();
                    try {
                        Carousel.curr.cancel();
                    } catch (err) { }
                }
            });
          }
        this.elem = Carousel.elem;
        document.getElementsByTagName("main")[0].classList.remove("noclick");

        this.elem.children[0].classList.remove("noclick");
        this.previews = this.elem.getElementsByClassName("card-lg");
        this.desc = this.elem.getElementsByClassName("card-description")[0];
        this.title_elem = document.getElementById("carousel_label");      
    }

    // Initializes the current Carousel
    start() {
        if (!this.elem)
            return;
        this.indices = this.container.cards.reduce((a, c, i) => (!this.predicate || this.predicate(c)) ? a.concat([i]) : a, []);

        if (this.indices.length <= 0)
            return this.exit();
        if (this.bSort)
            this.indices.sort((a, b) => Card.compare(this.container.cards[a], this.container.cards[b]));

        this.update();
        Carousel.setCurrent(this);

        if (this.title) {
            this.title_elem.innerHTML = this.title;
            this.title_elem.classList.remove("hide");
        } else {
            this.title_elem.classList.add("hide");
        }

       this.elem.classList.remove("hide");
        ui.enablePlayer(true);
        tocar("explaining", false);
        fimC = false;
        setTimeout(function () {
            var label = document.getElementById("carousel_label");
            if (label.innerText.indexOf("redraw") > -1 && label.className.indexOf("hide") == -1) tocar("game_start", false);
        }, 50);
    }

    // Called by the client to cycle cards displayed by n
    shift(event, n) {
        try {
            (event || window.event).stopPropagation();
        } catch (err) { }
        tocar("card", false);
        this.index = Math.max(0, Math.min(this.indices.length - 1, this.index + n));
        this.update();
    }

    // Called by client to perform action on the middle card in focus
    async select(event) {
        try {
            (event || window.event).stopPropagation();
        } catch (err) { }
        // In case of multiple selections, we only do action if not already selected
        if (this.selection.indexOf(this.indices[this.index]) < 0) {
            var label = document.getElementById("carousel_label");
            if (label.innerText.indexOf("redraw") > -1 && label.className.indexOf("hide") == -1) {
                tocar("redraw", false);
            } else {
                this.selection.push(this.indices[this.index]);
            }
            --this.count;
            if (this.isLastSelection())
                this.elem.classList.add("hide");
            if (this.count <= 0)
                ui.enablePlayer(false);
            // For redraw, we run the action right away
            if (label.innerText.indexOf("redraw") > -1 && label.className.indexOf("hide") == -1)
                await this.action(this.container, this.indices[this.index]);
            if (this.isLastSelection() && !this.cancelled) {
                this.exit();
                this.selection.map(async s => await this.action(this.container, s));
                this.selection = [];
                return;
            }

        } else {
            // If already selected, remove from selection
            this.selection.splice(this.selection.indexOf(this.indices[this.index]), 1);
            this.count++;
        }
        this.update();
    }

    // Called by client to exit out of the current Carousel if allowed. Enables player interraction.
    cancel() {
        if (!fimC) {
            fimC = true;
            tocar("discard", false);
            lCard = null;
            exibindo_lider = false;
            if (this.bExit) {
                this.cancelled = true;
                this.exit();
            }
            ui.enablePlayer(true);
        }
    }

    // Returns true if there are no more cards to view or select
    isLastSelection() {
        return this.count <= 0 || this.indices.length === 0;
    }

    // Updates the visuals of the current selection of cards
    update() {
        this.indices = this.container.cards.reduce((a, c, i) => (!this.predicate || this.predicate(c)) ? a.concat([i]) : a, []);
        if (this.index >= this.indices.length)
            this.index = this.indices.length - 1;
        for (let i = 0; i < this.previews.length; i++) {
            let curr = this.index - 2 + i;
            if (curr >= 0 && curr < this.indices.length) {
                let card = this.container.cards[this.indices[curr]];
                getPreviewElem(this.previews[i], card);
                this.previews[i].classList.remove("hide");
                this.previews[i].classList.remove("noclick");
                if (this.selection.indexOf(this.indices[curr]) >= 0)
                    this.previews[i].classList.add("selection");
                else
                    this.previews[i].classList.remove("selection");
            } else {
                this.previews[i].style.backgroundImage = "";
                this.previews[i].classList.add("hide");
                this.previews[i].classList.add("noclick");
                this.previews[i].classList.remove("selection");
            }
        }
        ui.setDescription(this.container.cards[this.indices[this.index]], this.desc);
    }

    // Clears and quits the current carousel
    exit() {
        for (let x of this.previews) {
            x.style.backgroundImage = "";
            x.classList.remove("selection");
        }
        this.elem.classList.add("hide");
        Carousel.clearCurrent();
        ui.quitCarousel();
    }

    // Statically sets the current carousel
    static setCurrent(curr) {
        this.curr = curr;
    }

    // Statically clears the current carousel
    static clearCurrent() {
        this.curr = null;
    }
}

// Custom confirmation windows
class Popup {
    constructor(yesName, yes, noName, no, header, description) {
        this.yes = yes ? yes : () => { };
        this.no = no ? no : () => { };
        this.choice = false;

        this.elem = document.getElementById("popup");
        let main = this.elem.children[0];
        main.children[0].innerHTML = header ? header : "";
        main.children[1].innerHTML = description ? description : "";
        main.children[2].children[0].innerHTML = (yesName) ? yesName : "Yes";
        main.children[2].children[1].innerHTML = (noName) ? noName : "No";

        this.elem.classList.remove("hide");
        Popup.setCurrent(this);
        ui.enablePlayer(true);
    }

    // Sets this as the current popup window
    static setCurrent(curr) {
        this.curr = curr;
    }

    // Unsets this as the current popup window
    static clearCurrent() {
        this.curr = null;
    }

    // Called when client selects the positive aciton
    selectYes() {
        this.clear();
        this.choice = true;
        this.yes(this);
        return true;
    }

    // Called when client selects the negative option
    selectNo() {
        this.clear();
        this.choice = false;
        this.no(this);
        return false;
    }

    // Clears the popup and diables player interraction
    clear() {
        ui.enablePlayer(false);
        this.elem.classList.add("hide");
        Popup.clearCurrent();
    }
}

class NumberValuePopup {
    constructor(value, min=0, max=999, callback, header, description) {
        this.callback = callback ? callback : () => { };
        this.choice = false;

        this.elem = document.getElementById("number-popup");
        let main = this.elem.children[0];
        main.children[0].innerHTML = header ? header : "";
        main.children[1].innerHTML = description ? description : "";
        this.numberElem = document.getElementById("number-popup-value");
        main.children[2].children[1].innerHTML = "Done";

        this.numberElem.setAttribute("value", value);
        this.numberElem.value = value;
        this.numberElem.setAttribute("min", min);
        this.numberElem.setAttribute("max", max);

        this.elem.classList.remove("hide");
        NumberValuePopup.setCurrent(this);
        ui.enablePlayer(true);
    }

    // Sets this as the current popup window
    static setCurrent(curr) {
        this.curr = curr;
    }

    // Unsets this as the current popup window
    static clearCurrent() {
        this.curr = null;
    }

    // Called when client confirms value
    done() {
        this.value = this.numberElem.value;
        if (!isNaN(this.value) && this.value != "") {
            this.clear();
            this.callback(this);
            return true;
        }
        
        return false;
    }

    // Clears the popup and diables player interraction
    clear() {
        ui.enablePlayer(false);
        this.elem.classList.add("hide");
        NumberValuePopup.clearCurrent();
    }
}

class HelperBox {
    constructor() {
        this.text = "";

        this.elem = document.getElementById("helper-box");

        document.getElementById("help-box-close").addEventListener("click", () => this.hide(), false);
        HelperBox.setCurrent(this);
    }

    // Sets this as the current helper box
    static setCurrent(curr) {
        this.curr = curr;
    }

    // Unsets this as the current helper box
    static clearCurrent() {
        this.curr = null;
    }

    showMessage(text, timer=0) {
        this.text = text;
        document.getElementById("helper-box-message").innerText = text;
        this.elem.classList.remove("hide");
        if (timer > 0) {
            timer = Math.min(timer, 30);
            var opacity = 1; // Initial opacity
            var h = this;
            setTimeout(function () {
                // Fading out - 1s
                var helperBoxInterval = setInterval(function () {
                    if (opacity > 0) {
                        opacity -= 0.1;
                        h.elem.style.opacity = opacity;
                    } else {
                        clearInterval(helperBoxInterval); // Stop the interval when opacity reaches 0
                        h.hide(); // Hide the element
                        h.elem.style.opacity = 1;
                    }
                }, 100);
            },timer*1000);
            
        }
    }

    hide() {
        this.elem.classList.add("hide");
    }
}

var carta_selecionada = null;

// Screen used to customize, import and export deck contents
class DeckMaker {
    constructor() {
        this.elem = document.getElementById("deck-customization");
        this.bank_elem = document.getElementById("card-bank");
        this.deck_elem = document.getElementById("card-deck");
        this.leader_elem = document.getElementById("card-leader");
        this.leader_elem.children[1].addEventListener("click", () => this.selectLeader(), false);
        this.leader_elem.children[1].addEventListener("mouseover", function () {
            tocar("card", false);
            this.style.boxShadow = "0 0 1.5vw #6d5210"
        });
        this.leader_elem.children[1].addEventListener("mouseout", function () {
            this.style.boxShadow = "0 0 0 #6d5210"
        });

        this.faction = "realms";
        this.setFaction(this.faction, true);

        let start_deck = JSON.parse(JSON.stringify(premade_deck[0]));
        start_deck.cards = start_deck.cards.map(c => ({
            index: c[0],
            count: c[1]
        }));
        this.me_deck_title = start_deck.title;
        this.setLeader(start_deck.leader);
        this.makeBank(this.faction, start_deck.cards);

        this.start_op_deck;
        this.me_deck_index = 0;
        this.op_deck_index = 0;

        this.change_elem = document.getElementById("change-faction");
        this.change_elem.addEventListener("click", () => this.selectFaction(), false);

        document.getElementById("select-deck").addEventListener("click", () => this.selectDeck(), false);
        document.getElementById("select-op-deck").addEventListener("click", () => this.selectOPDeck(), false);
        document.getElementById("download-deck").addEventListener("click", () => this.downloadDeck(), false);
        document.getElementById("add-file").addEventListener("change", () => this.uploadDeck(), false);

           const actualizartituloporid = () => {
            let elemTituloFaccion = document.getElementById("faction-title");
            if (elemTituloFaccion) {
                this.me_deck_title = elemTituloFaccion.innerText || elemTituloFaccion.textContent || "Northern Realms";
            } else {
                this.me_deck_title = "Northern Realms";
            }
                  
            if (ui && ui.player1Deck) { ui.player1Deck.title = this.me_deck_title; }
            ui.player1DeckTitle = this.me_deck_title;
        };

        document.getElementById("start-game").addEventListener("click", () => { actualizartituloporid(); this.startNewGame(1); }, false);
        document.getElementById("start-ai-game").addEventListener("click", () => { actualizartituloporid(); this.startNewGame(2); }, false);
        document.getElementById("start-pvp-game").addEventListener("click", () => { actualizartituloporid(); this.startNewGame(3); }, false);


        window.addEventListener("keydown", function (e) {
            if (document.getElementById("deck-customization").className.indexOf("hide") == -1) {
                switch (e.keyCode) {
                    case 69:
                        try {
                            Carousel.curr.cancel();
                        } catch (err) { }
                        if (isLoaded && iniciou) dm.startNewGame();
                        break;
                    case 88:
                        dm.selectLeader();
                        break;
                }
            }
        });
        somCarta();

        this.update();
    }


    // Called when client selects a deck faction. Clears previous cards and makes valid cards available.
    async setFaction(faction_name, silent) {
        if (!silent && this.faction === faction_name)
            return false;
        if (!silent) {
            tocar("warning", false);
            if (!confirm("Changing factions will clear the current deck. Continue? ")) {
                tocar("warning", false);
                return false;
            }
        }
        this.elem.getElementsByTagName("h1")[0].innerHTML = factions[faction_name].name;
        this.elem.getElementsByTagName("h1")[0].style.backgroundImage = iconURL("deck_shield_" + faction_name);
        document.getElementById("faction-description").innerHTML = factions[faction_name].description;

        this.leaders =
            Object.keys(card_dict).map(cid => ({
                card: card_dict[cid],
                index: cid
            }))
                .filter(c => c.card.deck === faction_name && c.card.row === "leader");
        if (!this.leader || this.faction !== faction_name) {
            this.leader = this.leaders[0];
            getPreviewElem(this.leader_elem.children[1], this.leader.card)
        }
        this.faction = faction_name;
        setTimeout(function () {
            somCarta();
        }, 300);
        return true;
    }

    // Called when client selects a leader for their deck
    setLeader(index) {
        this.leader = this.leaders.filter(l => l.index == index)[0];
        getPreviewElem(this.leader_elem.children[1], this.leader.card)
    }

    // Constructs a bank of cards that can be used by the faction's deck.
    // If a deck is provided, will not add cards to bank that are already in the deck.
    makeBank(faction, deck) {
        this.clear();
        let cards = Object.keys(card_dict).map(cid => ({
            card: card_dict[cid],
            index: cid
        })).filter(
            p => (([faction, "neutral", "weather", "special"].includes(p.card.deck) ||
                (["weather", "special"].includes(p.card.deck.split(" ")[0]) && p.card.deck.split(" ").includes(faction))) &&
                p.card.row !== "leader" && !factions[faction].unavailableSpecials.includes(p.index)));

        cards.sort(function (id1, id2) {
            let a = card_dict[id1.index],
                b = card_dict[id2.index];
            let c1 = {
                name: a.name,
                basePower: -a.strength,
                faction: a.deck.split(" ")[0] // Cleaning for faction specific special/weather cards
            };
            let c2 = {
                name: b.name,
                basePower: -b.strength,
                faction: b.deck.split(" ")[0] // Cleaning for faction specific special/weather cards
            };
            return Card.compare(c1, c2);
        });


        let deckMap = {};
        if (deck) {
            for (let i of Object.keys(deck)) deckMap[deck[i].index] = deck[i].count;
        }
        cards.forEach(p => {
            let count = deckMap[p.index] !== undefined ? Number(deckMap[p.index]) : 0;
            this.makePreview(p.index, Number.parseInt(p.card.count) - count, this.bank_elem, this.bank,);
            this.makePreview(p.index, count, this.deck_elem, this.deck);
        });
    }

    // Creates HTML elements for the card previews
    makePreview(index, num, container_elem, cards) {
        let card_data = card_dict[index];

        let elem = document.createElement("div");
        elem.classList.add("card-lg");
        elem = getPreviewElem(elem, card_data, num);
        container_elem.appendChild(elem);

        let bankID = {
            index: index,
            count: num,
            elem: elem
        };
        let isBank = cards === this.bank;
        cards.push(bankID);
        let cardIndex = cards.length - 1;
        elem.addEventListener("dblclick", () => this.select(cardIndex, isBank), false);
        elem.addEventListener("mouseover", () => {
            var aux = this;
            carta_selecionada = function () {
                aux.select(cardIndex, isBank);
            }
        }, false);
        window.addEventListener("keydown", function (e) {
            if (e.keyCode == 13 && carta_selecionada !== null) carta_selecionada();
        });
        // Right click allows to see more details about the selected card
        elem.addEventListener('contextmenu', async (e) => {
            e.preventDefault();
            let container = new CardContainer();
            container.cards = [new Card(index, card_data, null)];
            try {
                Carousel.curr.cancel();
            } catch (err) { }
            await ui.viewCardsInContainer(container);
        }, false);

        return bankID;
    }

    // Updates the card preview elements when any changes are made to the deck
    update() {
        for (let x of this.bank) {
            if (x.count)
                x.elem.classList.remove("hide");
            else
                x.elem.classList.add("hide");
        }
        let total = 0,
            units = 0,
            special = 0,
            strength = 0,
            hero = 0;
        for (let x of this.deck) {
            let card_data = card_dict[x.index];
            if (x.count)
                x.elem.classList.remove("hide");
            else
                x.elem.classList.add("hide");
            total += x.count;
            if (card_data.deck.startsWith("special") || card_data.deck.startsWith("weather")) {
                special += x.count;
                continue;
            }
            units += x.count;
            strength += card_data.strength * x.count;
            if (card_data.ability.split(" ").includes("hero"))
                hero += x.count;
        }
        this.stats = {
            total: total,
            units: units,
            special: special,
            strength: strength,
            hero: hero
        };
        this.updateStats();
    }

    // Updates and displays the statistics describing the cards currently in the deck
    updateStats() {
        let stats = document.getElementById("deck-stats");
        stats.children[1].innerHTML = this.stats.total;
        stats.children[3].innerHTML = this.stats.units + (this.stats.units < 22 ? "/22" : "");
        stats.children[5].innerHTML = this.stats.special + "/10";
        stats.children[7].innerHTML = this.stats.strength;
        stats.children[9].innerHTML = this.stats.hero;

        stats.children[3].style.color = this.stats.units < 22 ? "red" : "";
        stats.children[5].style.color = (this.stats.special > 10) ? "red" : "";
    }

    // Opens a Carousel to allow the client to select a leader for their deck
    selectLeader() {
        let container = new CardContainer();
        container.cards = this.leaders.map(c => {
            let card = new Card(c.index, c.card, player_me);
            card.data = c;
            return card;
        });

        let index = this.leaders.indexOf(this.leader);
        ui.queueCarousel(container, 1, (c, i) => {
            let data = c.cards[i].data;
            this.leader = data;
            getPreviewElem(this.leader_elem.children[1], data.card);
        }, () => true, false, true);
        Carousel.curr.index = index;
        Carousel.curr.update();
    }

       // Opens a Carousel to allow the client to select a faction for their deck
    selectFaction() {
        let container = new CardContainer();
        container.cards = Object.keys(factions).map(f => {
            return {
                abilities: [f],
                filename: f,
                desc_name: factions[f].name,
                desc: factions[f].description,
                faction: "faction"
            };
        });
        let index = container.cards.reduce((a, c, i) => c.filename === this.faction ? i : a, 0);
        ui.queueCarousel(container, 1, (c, i) => {
            let change = this.setFaction(c.cards[i].filename);
            if (!change)
                return;
            this.makeBank(c.cards[i].filename);
            this.update();
        }, () => true, false, true);

        // CORRECCIÓN DEFINITIVA: Validamos de forma segura si Carousel.curr existe
        if (Carousel.curr) {
            Carousel.curr.index = index;
            Carousel.curr.update();
        } else {
            // Si el carrusel está en cola y no se ha activado, dejamos que el sistema 
            // del juego maneje su propio inicio de manera interna sin colapsar.
            console.log("El carrusel está en cola esperando activación.");
        }
    }


    // Called when client selects s a preview card. Moves it from bank to deck or vice-versa then updates;
    select(index, isBank) {
        carta_selecionada = null;
        if (isBank) {
            tocar("menu_buy", false);
            this.add(index, this.deck);
            this.remove(index, this.bank);
        } else {
            tocar("discard", false);
            this.add(index, this.bank);
            this.remove(index, this.deck);
        }
        this.update();
    }

    // Adds a card to container (Bank or deck)
    add(index, cards) {
        let id = cards[index];
        id.elem.getElementsByClassName("card-count")[0].innerHTML = ++id.count;
        id.elem.getElementsByClassName("card-count")[0].classList.remove("hide");
    }

    // Removes a card from container (bank or deck)
    remove(index, cards) {
        let id = cards[index];
        id.elem.getElementsByClassName("card-count")[0].innerHTML = --id.count;
        if (id.count === 0)
            id.elem.getElementsByClassName("card-count")[0].classList.add("hide");
    }

    // Removes all elements in the bank and deck
    clear() {
        while (this.bank_elem.firstChild)
            this.bank_elem.removeChild(this.bank_elem.firstChild);
        while (this.deck_elem.firstChild)
            this.deck_elem.removeChild(this.deck_elem.firstChild);
        this.bank = [];
        this.deck = [];
        this.stats = {};
    }

    // Verifies current deck, creates the players and their decks, then starts a new game
    // Modes:
    // 1 - player VS AI
    // 2 - AI vs AI
    // 3 - player VS player (hotseat)
    startNewGame(mode = 1) {
        game.mode = mode;
        openFullscreen();
        let warning = "";
        if (this.stats.units < 22)
            warning += "Your deck must have at least 22 unit cards. \n";
        if (this.stats.special > 10)
            warning += "Your deck must have no more than 10 special cards. \n";
        if (warning != "") {
            return aviso(warning);
        }

        let me_deck = {
            faction: this.faction,
            leader: this.leader,
            cards: this.deck.filter(x => x.count > 0),
            title: this.me_deck_title
        };

        if (game.randomOPDeck || !this.start_op_deck) {
            this.start_op_deck = JSON.parse(JSON.stringify(premade_deck[randomInt(Object.keys(premade_deck).length)]));
            this.start_op_deck.cards = this.start_op_deck.cards.map(c => ({
                index: c[0],
                count: c[1]
            }));

            let leaders = Object.keys(card_dict).map(cid => {
                return {
                    index: cid,
                    card: card_dict[cid]
                };
            }).filter(c => c.card.row === "leader" && c.card.deck === this.start_op_deck.faction);
            this.start_op_deck.leader = leaders[randomInt(leaders.length)];
        }

        if (game.mode === 1) {
            player_me = new Player(0, "Player 1", me_deck, false);
            player_op = new Player(1, "Player 2", this.start_op_deck, true);
        } else if (game.mode === 2) {
            // AI vs AI
            player_me = new Player(0, "Player 1", me_deck, true);
            player_op = new Player(1, "Player 2", this.start_op_deck, true);
        } else {
            // PVP
            player_me = new Player(0, "Player 1", me_deck, false);
            player_op = new Player(1, "Player 2", this.start_op_deck, false);
        }


        this.elem.classList.add("hide");
        tocar("game_opening", false);
        game.startGame();
    }

    // Converts the current deck to a JSON string
    deckToJSON() {
        let obj = {
            faction: this.faction,
            leader: this.leader.index,
            cards: this.deck.filter(x => x.count > 0).map(x => [x.index, x.count])
        };
        return JSON.stringify(obj);
    }

    // Select a premade deck
    selectDeck() {
        let container = new CardContainer();
        container.cards = Object.values(premade_deck).map(d => {
            let deck = d;
            return {
                abilities: [deck["faction"]],
                name: card_dict[deck["leader"]]["name"],
                row: "leader",
                filename: card_dict[deck["leader"]]["filename"],
                desc_name: deck["title"],
                desc: "<p><b>Faction ability:</b> " + factions[deck["faction"]]["description"] + "</p><p><b>Leader ability:</b> " + ability_dict[card_dict[deck["leader"]]["ability"]].description + "</p>", /* <p><b>Deck description:</b> " + deck["description"], */
                faction: deck["faction"]
            };
        });
        let index = container.cards.reduce((a, c, i) => c.faction === this.faction ? i : a, 0);
        ui.queueCarousel(container, 1, (c, i) => {
            this.me_deck_index = i;
            this.setFaction(c.cards[i].faction, true);
            this.deckFromJSON(premade_deck[i], false);
        }, () => true, false, true);
        Carousel.curr.index = this.me_deck_index;
        Carousel.curr.update();
    }

    selectOPDeck() {
        let container = new CardContainer();
        // Adding first the option to select a random deck
        container.cards = [{
            abilities: [],
            name: "Random deck",
            row: "faction",
            filename: "random",
            desc_name: "Random deck",
            desc: "A random deck from the pool that will change every game.",
            faction: "faction"
        }];
        container.cards = container.cards.concat(Object.values(premade_deck).map(d => {
            let deck = d;
            return {
                abilities: [deck["faction"]],
                name: card_dict[deck["leader"]]["name"],
                row: "leader",
                filename: card_dict[deck["leader"]]["filename"],
                desc_name: deck["title"],
                desc: "<p><b>Faction ability:</b> " + factions[deck["faction"]]["description"] + "</p><p><b>Leader ability:</b> " + ability_dict[card_dict[deck["leader"]]["ability"]].description + "</p>", /* <p><b>Deck description:</b> " + deck["description"], */
                faction: deck["faction"]
            };
        }));
        ui.queueCarousel(container, 1, (c, i) => {
            this.op_deck_index = i;
            if (i === 0) {
                game.randomOPDeck = true;
                document.getElementById("op-deck-name").innerHTML = "Random deck";
            } else {
                this.start_op_deck = JSON.parse(JSON.stringify(premade_deck[i - 1]));
                this.start_op_deck.cards = this.start_op_deck.cards.map(c => ({
                    index: c[0],
                    count: c[1]
                }));
                this.start_op_deck.leader = {
                    index: this.start_op_deck.leader,
                    card: card_dict[this.start_op_deck.leader]
                };
                document.getElementById("op-deck-name").innerHTML = premade_deck[i - 1]["title"];
                game.randomOPDeck = false;
            }
        }, () => true, false, true);
        Carousel.curr.index = this.op_deck_index;
        Carousel.curr.update();
    }

    // Called by the client to downlaod the current deck as a JSON file
   downloadDeck() {
        let json = this.deckToJSON();
        
        if (typeof isMobile === "function" && isMobile()) {
            let elementoTemporalTexto = document.createElement("textarea");
            elementoTemporalTexto.value = json;
            elementoTemporalTexto.style.position = "fixed";
            elementoTemporalTexto.style.top = "0";
            elementoTemporalTexto.style.left = "0";
            elementoTemporalTexto.style.opacity = "0";
            document.body.appendChild(elementoTemporalTexto);
            elementoTemporalTexto.select();
            elementoTemporalTexto.setSelectionRange(0, 99999);
            
            try {
                document.execCommand("copy");
                
                let alertaTablero = document.createElement("div");
                alertaTablero.style.position = "fixed";
                alertaTablero.style.top = "50%";
                alertaTablero.style.left = "50%";
                alertaTablero.style.transform = "translate(-50%, -50%)";
                alertaTablero.style.backgroundColor = "rgba(20, 15, 10, 0.95)";
                alertaTablero.style.color = "#d9c39a";
                alertaTablero.style.padding = "12px 20px";
                alertaTablero.style.border = "2px solid #6d5210";
                alertaTablero.style.borderRadius = "5px";
                alertaTablero.style.fontFamily = "sans-serif";
                alertaTablero.style.fontSize = "13px";
                alertaTablero.style.textAlign = "center";
                alertaTablero.style.zIndex = "999999";
                alertaTablero.style.boxShadow = "0 0 15px #000";
                alertaTablero.innerHTML = "<b>Deck copied to clipboard!</b><br><br>Paste into any notepad app and save as a .json file.";
                
                document.body.appendChild(alertaTablero);
                setTimeout(() => { alertaTablero.remove(); }, 3000);
            } catch (err) { }
            
            document.body.removeChild(elementoTemporalTexto);
        } else {
            let str = "data:text/json;charset=utf-8," + encodeURIComponent(json);
            let hidden_elem = document.getElementById('download-json');
            if (hidden_elem) {
                hidden_elem.href = str;
                hidden_elem.download = "MyGwentDeck.json";
                hidden_elem.click();
            }
        }
    }


    // Called by the client to upload a JSON file representing a new deck
    uploadDeck() {
        let files = document.getElementById("add-file").files;
        if (files.length <= 0)
            return false;
        let fr = new FileReader();
        fr.onload = e => {
            try {
                this.deckFromJSON(e.target.result, true);
            } catch (e) {
                aviso("Uploaded deck is not formatted correctly!");
            }
        }
        fr.readAsText(files.item(0));
        document.getElementById("add-file").value = "";
        openFullscreen();
    }

    // Creates a deck from a JSON file's contents and sets that as the current deck
    // Notifies client with warnings if the deck is invalid
    deckFromJSON(json, parse) {
        let deck;
        if (parse) {
            try {
                deck = JSON.parse(json);
            } catch (e) {
                aviso("Uploaded deck is not parsable!");
                return;
            }
        } else {
            deck = JSON.parse(JSON.stringify(json));
        }
        let warning = "";
        if (card_dict[deck.leader].row !== "leader")
            warning += "'" + card_dict[deck.leader].name + "' is cannot be used as a leader\n";
        if (deck.faction != card_dict[deck.leader].deck)
            warning += "Leader '" + card_dict[deck.leader].name + "' doesn't match deck faction '" + deck.faction + "'.\n";

        let cards = deck.cards.filter(c => {
            let card = card_dict[c[0]];
            if (!card) {
                warning += "ID " + c[0] + " does not correspond to a card.\n";
                return false
            }
            if (!([deck.faction, "neutral", "special", "weather"].includes(card.deck) ||
                (["special", "weather"].includes(card.deck.split(" ")[0]) && card.deck.split(" ").includes(deck.faction)))) {
                warning += "'" + card.name + "' cannot be used in a deck of faction type '" + deck.faction + "'\n";
                return false;
            }
            if (card.count < c[1]) {
                console.log(card);
                warning += "Deck contains " + c[1] + "/" + card.count + " available " + card_dict[c[0]].name + " cards\n";
                return false;
            }
            return true;
        })
            .map(c => ({
                index: c[0],
                count: Math.min(c[1], card_dict[c[0]].count)
            }));

        if (warning) {
            tocar("warning", false);
            if (!confirm(warning + "\n\n\Continue importing deck?")) {
                tocar("warning", false);
                return;
            }
        }
        this.setFaction(deck.faction, true);
        if (card_dict[deck.leader].row === "leader" && deck.faction === card_dict[deck.leader].deck) {
            this.leader = this.leaders.filter(c => c.index === deck.leader)[0];
            getPreviewElem(this.leader_elem.children[1], this.leader.card);
        }
        this.me_deck_title = deck.title;
        this.makeBank(deck.faction, cards);
        this.update();
    }
}

class DeckSorter {
    constructor(cards, player, action, title, bottomAllowed = false) {
        if (!player || !cards || cards.length === 0)
            return;
        this.cards = cards;
        this.player = player;
        this.bottomAllowed = bottomAllowed;
        this.action = action ? action : () => this.close();
        this.title = title;
        this.completed = false;
        this.target_id = null;

        if (!DeckSorter.elem) {
            DeckSorter.elem = document.getElementById("deck-sorter");
        }
        this.elem = DeckSorter.elem;
        document.getElementsByTagName("main")[0].classList.remove("noclick");

        this.elem.children[0].classList.remove("noclick");
        this.title_elem = document.getElementById("deck-sorter-title");
    }

    // Initializes the current DeckSorter
    start() {
        if (!this.elem || !this.cards | this.cards.length == 0)
            return;

        let bankRow = document.getElementById("drop-bank");
        let deckTop = document.getElementById("drop-deck-top");
        let deckBottom = document.getElementById("drop-deck-bottom");
        //Remove old card boxes if any
        this.elem.querySelectorAll('.drop-box').forEach(oi => {
            oi.remove()
        });
        this.elem.querySelectorAll('.drop-susp').forEach(oi => {
            oi.remove()
        });

        // Add a "..." at the beginning of the bottom row
        let box = null;
        if (this.bottomAllowed) {
            deckBottom.style.visibility = 'visible';
            box = document.createElement("div");
            box.classList.add("drop-susp");
            box.innerHTML = "&centerdot;&centerdot;&centerdot;";
            deckBottom.appendChild(box);
        } else {
            deckBottom.style.visibility = 'hidden';
        }
        for (var i = 0; i < this.cards.length; i++) {
            // Create the bank box
            box = document.createElement("div");
            box.classList.add("drop-box");
            bankRow.appendChild(box);
            // Create the sortable item
            let item = document.createElement("div");
            item.classList.add("drop-item");
            item.setAttribute("draggable", "true");
            item.setAttribute("id", "item-" + i.toString());
            item.setAttribute("data-pos", i.toString());
            item.setAttribute("data-card-key", this.cards[i].key);
            box.appendChild(item);
            // Add card container
            let cardContainer = document.createElement("div");
            cardContainer.classList.add("card-lg");
            // Add the card content
            getPreviewElem(cardContainer, this.cards[i]);
            cardContainer.classList.remove("hide");
            cardContainer.classList.remove("noclick");
            item.appendChild(cardContainer);

            // Prevent all children elements from being draggable instead of the parent node
            let children = item.querySelectorAll('*');
            children.forEach(n => {
                n.setAttribute("draggable", "false")
            });

            item.addEventListener('dragstart', dragStart);
            item.addEventListener('dragend', dragEnd);
            // Add a box in the Top row
            box = document.createElement("div");
            box.classList.add("drop-box");
            deckTop.appendChild(box);
            // Add a box in the Bottom row
            if (this.bottomAllowed) {
                box = document.createElement("div");
                box.classList.add("drop-box");
                deckBottom.appendChild(box);
            }
        }
        // Add a "..." at the end of the bottom row
        box = document.createElement("div");
        box.classList.add("drop-susp");
        box.innerHTML = "&centerdot;&centerdot;&centerdot;";
        deckTop.appendChild(box);
        // Add done button
        box = document.createElement("div");
        box.classList.add("drop-susp");
        //box.innerHTML = "DONE";
        bankRow.appendChild(box);
        let submitBtn = document.createElement("button");
        submitBtn.setAttribute("id", "drop-submit");
        submitBtn.disabled = true;
        submitBtn.innerText = "DONE";
        submitBtn.addEventListener('click', submitDeckSorter);
        box.appendChild(submitBtn);

               function dragStart(e) {
            if (e.target) {
                DeckSorter.curr.target_id = e.target.id;
                DeckSorter.curr.selectedCard = e.target; // Guardamos para el modo táctil
                setTimeout(() => {
                    
                    e.target.style.opacity = "0.4";
                }, 0);
            }
        }

        function dragEnd(e) {
            let id = DeckSorter.curr.target_id;
            let draggable = document.getElementById(id);
            if (draggable) {
                draggable.style.opacity = "1"; 
            }
        }

        /* drop targets */
        let boxes = document.querySelectorAll('.drop-box');
        boxes.forEach(box => {
            box.addEventListener('dragenter', dragEnter);
            box.addEventListener('dragover', dragOver);
            box.addEventListener('dragleave', dragLeave);
            box.addEventListener('drop', drop);

            box.addEventListener('click', function(e) {
                let targetBox = e.currentTarget;
                if (DeckSorter.curr.selectedCard && targetBox.querySelectorAll('.drop-item').length == 0 && targetBox.classList.contains("drop-box")) {
                    let draggable = DeckSorter.curr.selectedCard;
                    
                    targetBox.appendChild(draggable);
                    draggable.style.opacity = "1"; 
                    
                    DeckSorter.curr.selectedCard = null;

                    var bank = document.getElementById("drop-bank").querySelectorAll('.drop-item');
                    document.getElementById("drop-submit").disabled = (bank.length > 0);
                }
            });
        });

        window.addEventListener('click', function(e) {
            let targetCard = e.target.closest('.drop-item');
            if (targetCard) {
                DeckSorter.curr.target_id = targetCard.id;
                DeckSorter.curr.selectedCard = targetCard;
                
                document.querySelectorAll('.drop-item').forEach(el => el.style.opacity = "1");
                targetCard.style.opacity = "0.5";
            }
        });

        function dragEnter(e) {
            e.preventDefault();
            if (e.target && e.target.classList.contains("drop-box")) {
                e.target.classList.add('drag-over');
            }
        }

        function dragOver(e) {
            e.preventDefault();
            if (e.target && e.target.classList.contains("drop-box")) {
                e.target.classList.add('drag-over');
            }
        }

        function dragLeave(e) {
            if (e.target) {
                e.target.classList.remove('drag-over');
            }
        }

        function drop(e) {
            if (e.target) {
                e.target.classList.remove('drag-over');
                let id = DeckSorter.curr.target_id;
                let draggable = document.getElementById(id);

                let targetBox = e.target.closest('.drop-box');
                if (targetBox && targetBox.querySelectorAll('.drop-item').length == 0) {
                    targetBox.appendChild(draggable);
                }

                if (draggable) {
                    draggable.style.opacity = "1";
                }

                DeckSorter.curr.selectedCard = null;

                var bank = document.getElementById("drop-bank").querySelectorAll('.drop-item');
                document.getElementById("drop-submit").disabled = (bank.length > 0);
            }
        }

        function submitDeckSorter(e) {
            var bank = document.getElementById("drop-bank").querySelectorAll('.drop-item');
            var deckTop = document.getElementById("drop-deck-top").querySelectorAll('.drop-item');
            var deckBottom = document.getElementById("drop-deck-bottom").querySelectorAll('.drop-item');

            if (bank.length == 0 && (deckTop.length + deckBottom.length) == DeckSorter.curr.cards.length) {
                DeckSorter.curr.applyChanges();
                DeckSorter.curr.exit();
            }
        }

        if (this.title) {
            this.title_elem.innerHTML = this.title;
            this.title_elem.classList.remove("hide");
        } else {
            this.title_elem.classList.add("hide");
        }

        DeckSorter.setCurrent(this);

        this.elem.classList.remove("hide");
        ui.enablePlayer(true);
    }

    // Closes the deck sorter interface
    exit() {
        let bankRow = document.getElementById("drop-bank");
        let deckTop = document.getElementById("drop-deck-top");
        let deckBottom = document.getElementById("drop-deck-bottom");
        //Remove old card boxes if any
        bankRow.querySelectorAll('.drop-item').forEach(oi => {
            oi.remove()
        });
        deckTop.querySelectorAll('.drop-susp').forEach(oi => {
            oi.remove()
        });
        deckBottom.querySelectorAll('.drop-susp').forEach(oi => {
            oi.remove()
        });
        this.elem.classList.add("hide");
        DeckSorter.clearCurrent();
        ui.enablePlayer(true);
    }

    isCompleted() {
        return this.completed;
    }

    applyChanges() {
        let deckTop = Array.from(document.getElementById("drop-deck-top").querySelectorAll('.drop-item'));
        let deckBottom = Array.from(document.getElementById("drop-deck-bottom").querySelectorAll('.drop-item'));
        // Init new deck without the first X cards being sorted
        let newdeck = this.player.deck.cards.slice(this.cards.length);
        let head = [];
        //Adding cards at the top
        let cards_bank = this.cards;
        deckTop.forEach(function (el) {
            let pos = parseInt(el.dataset.pos);
            head.push(cards_bank[pos]);
        });
        newdeck.unshift(...head);
        //Adding cards at the bottom
        deckBottom.forEach(function (el) {
            let pos = parseInt(el.dataset.pos);
            newdeck.push(cards_bank[pos]);
        });
        // set new deck order
        this.player.deck.cards = newdeck;

        this.completed = true;
    }

    // Statically sets the current carousel
    static setCurrent(curr) {
        this.curr = curr;
    }

    // Statically clears the current carousel
    static clearCurrent() {
        this.curr = null;
    }
}

// Translates a card between two containers
async function translateTo(card, container_source, container_dest) {
    if (!container_dest || !container_source)
        return;
    // When solo vs AI, do not display the translations between hand and deck for the AI
    if (game.mode == 1 && (container_dest === player_op.hand && container_source === player_op.deck) || (container_dest === player_op.deck && container_source === player_op.hand) )
        return;

    let elem = card.elem;
    let source = !container_source ? card.elem : getSourceElem(card, container_source, container_dest);
    let dest = getDestinationElem(card, container_source, container_dest);
 if (!source) {
        console.warn("¡Aviso! Se interceptó un contenedor de origen inválido en la animación.");
        return; 
    }
    if (!isInDocument(elem))
        source.appendChild(elem);
    let x = trueOffsetLeft(dest) - trueOffsetLeft(elem) + dest.offsetWidth / 2 - elem.offsetWidth;
    let y = trueOffsetTop(dest) - trueOffsetTop(elem) + dest.offsetHeight / 2 - elem.offsetHeight / 2;
    if (container_dest instanceof Row && container_dest.cards.length !== 0 && !card.isSpecial()) {
        x += (container_dest.getSortedIndex(card) === container_dest.cards.length) ? elem.offsetWidth / 2 : -elem.offsetWidth / 2;
    }
    if (card.holder.controller instanceof ControllerAI)
        x += elem.offsetWidth / 2;
    if (container_source instanceof Row && container_dest instanceof Grave && !card.isSpecial()) {
        let mid = trueOffset(container_source.elem, true) + container_source.elem.offsetWidth / 2;
        x += trueOffset(elem, true) - mid;
    }
    if (container_source instanceof Row && container_dest === player_me.hand)
        y *= 7 / 8;
    await translate(elem, x, y);

    // Returns true if the element is visible in the viewport
    function isInDocument(elem) {
        return elem.getBoundingClientRect().width !== 0;
    }

    // Returns the true offset of a nested element in the viewport
    function trueOffset(elem, left) {
        let total = 0;
        let curr = elem;
        while (curr) {
            total += (left ? curr.offsetLeft : curr.offsetTop);
            curr = curr.parentElement;
        }
        return total;
    }

    function trueOffsetLeft(elem) {
        return trueOffset(elem, true);
    }

    function trueOffsetTop(elem) {
        return trueOffset(elem, false);
    }

    // Returns the source container's element to transition from
    function getSourceElem(card, source, dest) {
        if (source instanceof HandAI)
            return source.hidden_elem;
        if (source instanceof Deck)
            return source.elem.children[source.elem.children.length - 2];
        return source.elem;
    }

    // Returns the destination container's element to transition to
    function getDestinationElem(card, source, dest) {
        if (dest instanceof HandAI)
            return dest.hidden_elem;
        if (card.isSpecial() && dest instanceof Row)
            //return dest.elem_special;
            return dest.special.elem;
        if (dest instanceof Row || dest instanceof Hand || dest instanceof Weather) {
            if (dest.cards.length === 0)
                return dest.elem;
            let index = dest.getSortedIndex(card);
            let dcard = dest.cards[index === dest.cards.length ? index - 1 : index];
            return dcard.elem;
        }
        return dest.elem;
    }
}

// Translates an element by x from the left and y from the top
async function translate(elem, x, y) {
    let vw100 = 100 / document.getElementById("dimensions").offsetWidth;
    x *= vw100;
    y *= vw100;
    elem.style.transform = "translate(" + x + "vw, " + y + "vw)";
    let margin = elem.style.marginLeft;
    elem.style.marginRight = -elem.offsetWidth * vw100 + "vw";
    elem.style.marginLeft = "";
    await sleep(499);
    elem.style.transform = "";
    elem.style.position = "";
    elem.style.marginLeft = margin;
    elem.style.marginRight = margin;
}

// Fades out an element until hidden over the duration
async function fadeOut(elem, duration, delay) {
    await fade(false, elem, duration, delay);
}

// Fades in an element until opaque over the duration
async function fadeIn(elem, duration, delay) {
    await fade(true, elem, duration, delay);
}

// Fades an element over a duration 
async function fade(fadeIn, elem, dur, delay) {
    if (delay)
        await sleep(delay);
    let op = fadeIn ? 0.1 : 1;
    elem.style.opacity = op;
    elem.style.filter = "alpha(opacity=" + (op * 100) + ")";
    if (fadeIn)
        elem.classList.remove("hide");
    let fadetimer = setInterval(async function () {
        op += (fadeIn ? 0.1 : -0.1);
        if (op >= 1) {
            clearInterval(fadetimer);
            return;
        } else if (op <= 0.1) {
            elem.classList.add("hide");
            elem.style.opacity = "";
            elem.style.filter = "";
            clearInterval(fadetimer);
            return;
        }
        elem.style.opacity = op;
        elem.style.filter = "alpha(opacity=" + (op * 100) + ")";
    }, dur / 10);
}

// Get Image paths   
function iconURL(name, ext = "png") {
if (!name || name === "card_ability_" || name === "card_ability_undefined") {
        return "";    }
if (name === "card_ability_agile_cr") {
        return imgURL("icons/card_ability_agile", ext); }    
return imgURL("icons/" + name, ext);
}

function largeURL(name, ext = "jpg") {
    return imgURL("lg/" + name, ext)
}

function smallURL(name, ext = "jpg") {
    return imgURL("sm/" + name, ext);
}

function bottomBgURL() {
    return imgURL("icons/gwent_bottom_bg", "png");
}

function imgURL(path, ext) {
    return "url('img/" + path + "." + ext + "')";
}

function getPreviewElem(elem, card, nb = 0) {
    // Cleaning existing child nodes
    while (elem.hasChildNodes()) {
        elem.removeChild(elem.lastChild);
    }
    elem.classList.remove("hero");
    elem.classList.remove("faction");

    let c_abilities = "";
    if ("ability" in card) {
        c_abilities = card.ability.split(" ");
    } else {
        c_abilities = card.abilities;
    }
    let faction = ""
    if ("deck" in card) {
        faction = card.deck.split(" ")[0]; // Cleaning in case of special/weather cards being faction specific
    } else {
        faction = card.faction;
    }

    elem.style.backgroundImage = smallURL(faction + "_" + card.filename);

    if (faction == "faction") {
        elem.classList.add("faction");
        return elem;
    }

    if (card.row != "leader" && !faction.startsWith("special") && faction != "neutral" && !faction.startsWith("weather")) {
        let factionBand = document.createElement("div");
        factionBand.style.backgroundImage = iconURL("faction-band-" + faction);
        factionBand.classList.add("card-large-faction-band");
        elem.appendChild(factionBand);
    }

    let cardbg = document.createElement("div");
    cardbg.style.backgroundImage = bottomBgURL();
    cardbg.classList.add("card-large-bg");
    elem.appendChild(cardbg);


    let card_name = document.createElement("div");
    card_name.classList.add("card-large-name");
    card_name.appendChild(document.createTextNode(card.name));
    elem.appendChild(card_name);

    if ("quote" in card) {
        let quote_elem = document.createElement("div");
        quote_elem.classList.add("card-large-quote");
        quote_elem.appendChild(document.createTextNode(card.quote));
        elem.appendChild(quote_elem);
    }

    // Nothing else to display for leaders
    if (card.row === "leader") {
        return elem;
    }

    let count = document.createElement("div");
    count.innerHTML = nb;
    count.classList.add("card-count");
    cardbg.appendChild(count);
    if (nb == 0) {
        count.classList.add("hide");
    }

    let power = document.createElement("div");
    power.classList.add("card-large-power");
    elem.appendChild(power);
    let bg;
    if (c_abilities[0] === "hero" || ("hero" in card && card.hero)) {
        bg = "power_hero";
        elem.classList.add("hero");
    } else if (faction.startsWith("weather")) {
        bg = "power_" + c_abilities[0];
    } else if (faction.startsWith("special")) {
        let str = c_abilities[0];
        if (str === "shield_c" || str == "shield_r" || str === "shield_s")
            str = "shield";
        bg = "power_" + str;
        elem.classList.add("special");
    } else {
        bg = "power_normal";
    }
    power.style.backgroundImage = iconURL(bg);

    let row = document.createElement("div");
    row.classList.add("card-large-row");
    elem.appendChild(row);
    if (card.row === "close" || card.row === "ranged" || card.row === "siege" || card.row.includes("agile")) {
        let num = document.createElement("div");
        if ("strength" in card) {
            num.appendChild(document.createTextNode(card.strength));
        } else {
            num.appendChild(document.createTextNode(card.basePower));
        }
        num.classList.add("card-large-power-strength");
        power.appendChild(num);
        row.style.backgroundImage = iconURL("card_row_" + card.row);
    } else if (card.row === "weather" && card.targetRows.length > 0) {
        // For rare weather cards which can target different rows for a same wheather type (such as White Frost)
        row.style.backgroundImage = iconURL("card_row_" + card.targetRows);
    }

    if (c_abilities.length > 0 || (card.row && card.row.includes("agile"))) {
        let abi = document.createElement("div");
        abi.classList.add("card-large-ability");
        elem.appendChild(abi);

        if (c_abilities.length > 0 && !faction.startsWith("special") && !faction.startsWith("weather") && c_abilities[c_abilities.length - 1] != "hero") {
            let str = c_abilities[c_abilities.length - 1];
            if (str === "cerys")
                str = "muster";
            if (str.startsWith("avenger"))
                str = "avenger";
            if (str === "scorch_c" || str == "scorch_r" || str === "scorch_s")
                str = "scorch_combat";
            if (str === "shield_c" || str == "shield_r" || str === "shield_s")
                str = "shield";
            abi.style.backgroundImage = iconURL("card_ability_" + str);
        } 
        if ((c_abilities.length === 0 || !abi.style.backgroundImage) && card.row && card.row.includes("agile") && !faction.startsWith("weather")) {
            abi.style.backgroundImage = iconURL("card_ability_agile");
        }

               // In case of double abilities
        if (c_abilities.length > 1) {
            let str = c_abilities[c_abilities.length - 2];
            
            if (str && str !== "hero") {
                let abi2 = document.createElement("div");
                abi2.classList.add("card-large-ability-2");
                elem.appendChild(abi2);

                if (str === "cerys")
                    str = "muster";
                if (str.startsWith("avenger"))
                    str = "avenger";
                if (str === "scorch_c" || str == "scorch_r" || str === "scorch_s")
                    str = "scorch_combat";
                if (str === "shield_c" || str == "shield_r" || str === "shield_s")
                    str = "shield";
                    
                abi2.style.backgroundImage = iconURL("card_ability_" + str);
            }
        }
  }

    return elem;
}

// Returns true if n is an Number
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

// Returns true if s is a String
function isString(s) {
    return typeof (s) === 'string' || s instanceof String;
}

// Returns a random integer in the range [0,n)
function randomInt(n) {
    return Math.floor(Math.random() * n);
}

// Pauses execution until the passed number of milliseconds as expired
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Suspends execution until the predicate condition is met, checking every ms milliseconds
function sleepUntil(predicate, ms) {
    return new Promise(resolve => {
        let sutimer = setInterval(function () {
            if (predicate()) {
                clearInterval(sutimer);
                resolve();
            }
        }, ms)
    });
}


/*----------------------------------------------------*/

var ui = new UI();
var board = new Board();
var weather = new Weather();
var game = new Game();
var player_me, player_op;

ui.enablePlayer(false);
let dm = new DeckMaker();

document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function (e) {
    if (e.keyCode != 123) {
        if (document.getElementById("carousel").className != "hide") {
            switch (e.keyCode) {
                case 13:
                    Carousel.curr.select(e);
                    break;
                case 37:
                    Carousel.curr.shift(e, -1);
                    break;
                case 39:
                    Carousel.curr.shift(e, 1);
                    break;
            }
        } else if (document.getElementsByClassName("hover_un")[0].innerText.length > 1) {
            switch (e.keyCode) {
                case 69:
                    Popup.curr.selectYes();
                    break;
                case 81:
                    Popup.curr.selectNo();
                    break;
            }
        } else if (!iniciou && isLoaded && (e.keyCode == 13 || e.keyCode == 69)) inicio();
    } else return false;
}

var elem_principal = document.documentElement;

async function openFullscreen() {
    try {
        if (elem_principal.requestFullscreen) elem_principal.requestFullscreen();
        else if (elem_principal.webkitRequestFullscreen) elem_principal.webkitRequestFullscreen();
        else if (elem_principal.msRequestFullscreen) elem_principal.msRequestFullscreen();
        await window.screen.orientation.lock("landscape");
    } catch (err) { }
}

var lastSound = "";

function tocar(arquivo, pararMusica) {
    if (arquivo != lastSound && arquivo != "") {
        var s = new Audio("sfx/" + arquivo + ".mp3");
const canVibrate = typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';
			if (canVibrate) {
			if (arquivo === "scorch" || arquivo === "fire" || arquivo === "burn") { navigator.vibrate([40, 30, 40, 30, 40]);			}
			
			else if (arquivo === "horn" || arquivo === "war_horn" || arquivo === "commander_horn") {
				navigator.vibrate([250, 100, 250]); 
			}
			
			else if (arquivo === "med") {
				navigator.vibrate(250); 
			}
			
			else if (arquivo === "spy" || arquivo === "draw") {
				navigator.vibrate([60, 50, 60]); 
			}

			else if (arquivo === "ally") {
				navigator.vibrate([40, 30, 40, 30, 40]); 
			}

			else if (arquivo === "hero") {
				navigator.vibrate([150, 80, 150, 80, 250]); 
			}

			else if (arquivo === "moral") {
			navigator.vibrate(120); 			}

			else if (arquivo === "shield") {
				navigator.vibrate([80, 60, 150]); 
			}
		}

        lastSound = arquivo;
        if (iniciou) s.play();
        setTimeout(function () {
            lastSound = "";
        }, 50);
    }
}

function aviso(texto) {
    tocar("warning", false);
    setTimeout(function () {
        alert(texto);
        document.getElementById("start-game").blur();
        tocar("warning", false);
    }, 150);
}

function somCarta() {
    var classes = ["card", "card-lg"];
    for (var i = 0; i < classes.length; i++) {
        var cartas = document.getElementsByClassName(classes[i]);
        for (var j = 0; j < cartas.length; j++) {
            if (cartas[j].id != "no_sound" && cartas[j].id != "no_hover") cartas[j].addEventListener("mouseover", function () {
                tocar("card", false);
            });
        }
    }
    var tags = ["label", "a", "button"];
    for (var i = 0; i < tags.length; i++) {
        var rec = document.getElementsByTagName(tags[i]);
        for (var j = 0; j < rec.length; j++) rec[j].addEventListener("mouseover", function () {
            tocar("card", false);
        });
    }
    var ids = ["pass-button", "toggle-music"];
    for (var i = 0; i < ids.length; i++) document.getElementById(ids[i]).addEventListener("mouseover", function () {
        tocar("card", false);
    });
}

async function cartaNaLinha(id, carta) {
	if (id.charAt(0) == "f") {
		if (!carta.hero) {
			if (carta.name != "Decoy") {
				var linha = parseInt(id.charAt(1));
				if (linha == 1 || linha == 6) tocar("common3", false);
				else if (linha == 2 || linha == 5) tocar("common2", false);
				else if (linha == 3 || linha == 4) tocar("common1", false);
			} else tocar("menu_buy", false);
		} else {
			
			tocar("hero", false);
			
			
			if (carta && typeof carta.animate === "function") {
				await carta.animate("hero");
			}
		}
	}
}

function inicio() {
    var classe = document.getElementsByClassName("abs");
    for (var i = 0; i < classe.length; i++) classe[i].style.display = "none";
    iniciou = true;
    tocar("menu_opening", false);
    openFullscreen();
    iniciarMusica();
}

function iniciarMusica() {
    }

function cancelaClima() {
    if (carta_c) {
        ui.cancel();
        hover_row = false;
        setTimeout(function () {
            hover_row = true;
        }, 100);
    }
}

var iniciou = false,
    isLoaded = false;

var playingOnline;

window.onload = function () {
    dimensionar();
    playingOnline = window.location.href == "https://randompianist.github.io/gwent-classic-v2.0/";
    document.getElementById("load_text").style.display = "none";
    document.getElementById("button_start").style.display = "inline-block";
    document.getElementById("deck-customization").style.display = "";
    document.getElementById("toggle-music").style.display = "";
    document.getElementsByTagName("main")[0].style.display = "";
    document.getElementById("button_start").addEventListener("click", function () {
if (typeof window !== "undefined" && window.Website2APK && typeof window.Website2APK.vibrate === "function") {
window.Website2APK.vibrate(60); 
		} else if (navigator.vibrate) {
			navigator.vibrate(60);
		}
        inicio();
    });
    isLoaded = true;
}

window.onresize = function () {
    dimensionar();
}

function dimensionar() {
    var prop = window.innerWidth / window.innerHeight;
    var dim = document.getElementById("dimensions").offsetHeight;
    document.getElementById("very_start_bg2").style.height = prop < 1.8 ? (parseInt(dim * 0.94) - 8) + "px" : "";
    document.getElementById("very_start").style.paddingTop = "";
    document.getElementById("very_start").style.paddingTop = parseInt(
        (document.getElementById("very_start_bg2").offsetHeight - document.getElementById("very_start").offsetHeight) / 2
    ) + "px";
}

setTimeout(dimensionar(), 300);

function isMobile() {
    if (navigator.userAgentData)
        return navigator.userAgentData.mobile;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function actualizarPosicionMusicaMovel() {
    if (isMobile && typeof isMobile === "function" && isMobile()) {
        let musicToggle = document.getElementById("toggle-music");
        if (musicToggle) {
            if (musicToggle.classList.contains("music-customization")) {
                musicToggle.style.transform = "translate(22.6vw, -3.5vw)";
musicToggle.style.gap = "30px";
                musicToggle.style.fontSize = "4.0vw";
            } else {
                musicToggle.style.transform = "translate(-23.5vw, -4.5vw)";
musicToggle.style.gap = "15px";
                musicToggle.style.fontSize = "4.1vw";
            }
        }
    }
}

(function() {
    if (typeof window !== "undefined") {       
        if (window.chrome && window.chrome.webview) {
            window.chrome.webview.postMessage({ type: "SET_TEXT_ZOOM", value: 100 });
        }
     
        let estiloBlindaje = document.createElement("style");
        estiloBlindaje.innerHTML = `
            * {
                -webkit-text-size-adjust: 100% !important;
                -moz-text-size-adjust: 100% !important;
                text-size-adjust: 100% !important;
            }
        `;
        document.head.appendChild(estiloBlindaje);
    }
})();
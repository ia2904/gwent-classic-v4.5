"use strict"

var ability_dict = {
    clear: {
        name: "Clear Weather",
        description: "Removes all Weather Cards (Biting Frost, Impenetrable Fog and Torrential Rain) effects. ",
        placed: async (card, row) => {
            // If ability carried by a unit/hero card, draw the weather card from the deck
            if (card.isUnit() || card.hero) {
                let wCard = card.holder.deck.findCard(c => c.row === "weather" && c.abilities.includes("clear"));
                if (wCard) {
                    await wCard.autoplay(card.holder.deck);
                }
            }
        }
    },
    frost: {
        name: "Biting Frost",
        description: "Sets the strength of all Close Combat cards to 1 for both players. ",
        placed: async (card, row) => {
            // If ability carried by a unit/hero card, draw the weather card from the deck
            if (card.isUnit() || card.hero) {
                let wCard = card.holder.deck.findCard(c => c.row === "weather" && c.abilities.includes("frost"));
                if (wCard) {
                    await wCard.autoplay(card.holder.deck);
                }
            }
        }
    },
    white_frost: {
        name: "White Frost",
        description: "Sets the strength of all cards on the 2 corresponding rows to 1 for both players.",
        placed: async (card, row) => {
            if(card.targetRows === "agile_cr")
                card.abilities = ["frost", "fog"];
            else if (card.targetRows === "agile_cs")
                card.abilities = ["frost", "rain"];
            else if (card.targetRows === "agile_rs")
                card.abilities = ["fog", "rain"];
            // If ability carried by a unit/hero card, draw the weather card from the deck
            if (card.isUnit() || card.hero) {
                let wCard = card.holder.deck.findCard(c => c.row === "weather" && c.abilities.includes("white_frost"));
                if (wCard) {
                    await wCard.autoplay(card.holder.deck);
                }
            }
        }
    },
    fog: {
        name: "Impenetrable Fog",
        description: "Sets the strength of all Ranged Combat cards to 1 for both players. ",
        placed: async (card, row) => {
            // If ability carried by a unit/hero card, draw the weather card from the deck
            if (card.isUnit() || card.hero) {
                let wCard = card.holder.deck.findCard(c => c.row === "weather" && c.abilities.includes("fog"));
                if (wCard) {
                    await wCard.autoplay(card.holder.deck);
                }
            }
            player_me.deck.cards.filter(c => c.abilities.includes("fog_summoning")).map(c => c.autoplay(player_me.deck));
            player_me.grave.cards.filter(c => c.abilities.includes("fog_summoning")).map(c => c.autoplay(player_me.grave));
            player_op.deck.cards.filter(c => c.abilities.includes("fog_summoning")).map(c => c.autoplay(player_op.deck));
            player_op.grave.cards.filter(c => c.abilities.includes("fog_summoning")).map(c => c.autoplay(player_op.grave));
        }
    },
    fog_summoning: {
        name: "Impenetrable Fog Summoning",
        description: "When Impenetrable Fog is played by any player, draw this card from your deck or discard pile and play it. Fog does not affect this unit."
    },
    rain: {
        name: "Torrential Rain",
        description: "Sets the strength of all Siege Combat cards to 1 for both players. ",
        placed: async (card, row) => {
            // If ability carried by a unit/hero card, draw the weather card from the deck
            if (card.isUnit() || card.hero) {
                let wCard = card.holder.deck.findCard(c => c.row === "weather" && c.abilities.includes("rain"));
                if (wCard) {
                    await wCard.autoplay(card.holder.deck);
                }
            }
        }
    },
    storm: {
        name: "Skellige Storm",
        description: "Reduces to 1 the strength of all units either in Close/Ranged rows, or Siege/Ranged rows.",
        placed: async (card, row) => {
            if (!(card.holder.controller instanceof ControllerAI)) {
                let c = await ui.popup("Close + Ranged [E]", (p) => p.choice = "frost", "Ranged + Siege [Q]", (p) => p.choice = "rain", "Which rows to target", "Skellige Storm can either target Close/Ranged rows or Ranged/Siege rows, which one to target?");
                card.abilities = [c, "fog"];
            } else {
                if (card.holder.controller.weightWeather({ key: "spe_storm", abilities: ["frost", "fog"] }) >= card.holder.controller.weightWeather({ key: "spe_storm", abilities: ["rain", "fog"] })) {
                    card.abilities = ["frost", "fog"];
                } else {
                    card.abilities = ["rain", "fog"];
                }
            }
            // If ability carried by a unit/hero card, draw the weather card from the deck
            if (card.isUnit() || card.hero) {
                let wCard = card.holder.deck.findCard(c => c.row === "weather" && c.abilities.includes("storm"));
                if (wCard) {
                    await wCard.autoplay(card.holder.deck);
                }
            }
        }
    },
    hero: {
        name: "Hero",
        description: "Not affected by any Special Cards or abilities. "
    },
    decoy: {
        name: "Decoy",
        description: "Swap with a card on the battlefield to return it to your hand. "
    },
    horn: {
        name: "Commander's Horn",
        description: "Doubles the strength of all unit cards in that row. Limited to 1 per row. ",
        placed: async card => await card.animate("horn"),
        effectAfterMove: true
    },
    mardroeme: {
        name: "Mardroeme",
        description: "Triggers transformation of all Berserker cards on the same row. ",
        placed: async (card, row) => {
            if (card.isLocked())
                return;
            let berserkers = row.findCards(c => c.abilities.includes("berserker"));
            await Promise.all(berserkers.map(async c => await ability_dict["berserker"].placed(c, row)));
        }
    },
    berserker: {
        name: "Berserker",
        description: "Transforms into a bear when a Mardroeme card is on its row. ",
        placed: async (card, row) => {
            if (row.effects.mardroeme === 0 || card.isLocked())
                return;
            await card.animate("mardroeme");
            row.removeCard(card);
            await row.addCard(new Card(card.target, card_dict[card.target], card.holder));
        }
    },
       scorch: {
        name: "Scorch",
        description: "Discard after playing. Kills the strongest card(s) on the battlefield. ",
        activated: async card => {
            await ability_dict["scorch"].placed(card);
            await board.toGrave(card, card.currentLocation || card.holder.hand);
        },
        placed: async (card, row) => {
            if (card.isLocked() || game.scorchCancelled)
                return;
            if (row !== undefined)
                row.cards.splice(row.cards.indexOf(card), 1);
            let maxUnits = board.row.map(r => [r, r.maxUnits()]).filter(p => p[1].length > 0).filter(p => !p[0].isShielded());
            if (row !== undefined)
                row.cards.push(card);
            let maxPower = maxUnits.reduce((a, p) => Math.max(a, p[1][0].power), 0);
            let scorched = maxUnits.filter(p => p[1][0].power === maxPower);
            let cards = scorched.reduce((a, p) => a.concat(p[1].map(u => [p[0], u])), []);

            await Promise.all(cards.map(async u => {
                if (u[1] && typeof u[1].animate === "function") {
                    await u[1].animate("scorch", true, false);
                }
            }));
            
            for (let i = 0; i < cards.length; i++) {
                let pair = cards[i];
                if (pair[1] && pair[0]) {
                    await board.toGrave(pair[1], pair[0]);
                }
            }
            await sleep(400);
            board.updateScores();
        }
    },

    scorch_c: {
        name: "Scorch - Close Combat",
        description: "Destroy your enemy's strongest Close Combat unit(s) if the combined strength of all his or her Close Combat units is 10 or more. ",
        placed: async (card) => await board.getRow(card, "close", card.holder.opponent()).scorch()
    },
    scorch_r: {
        name: "Scorch - Ranged",
        description: "Destroy your enemy's strongest Ranged Combat unit(s) if the combined strength of all his or her Ranged Combat units is 10 or more. ",
        placed: async (card) => await board.getRow(card, "ranged", card.holder.opponent()).scorch()
    },
    scorch_s: {
        name: "Scorch - Siege",
        description: "Destroys your enemy's strongest Siege Combat unit(s) if the combined strength of all his or her Siege Combat units is 10 or more. ",
        placed: async (card) => await board.getRow(card, "siege", card.holder.opponent()).scorch()
    },
    agile: {
        name: "Agile",
        description: "Can be placed in either the Close Combat or the Ranged Combat row. Cannot be moved once placed. "
    },
    agile_cr: {
        name: "Agile Close/Ranged",
        description: "Can be placed in either the Close Combat or the Ranged Combat row. Cannot be moved once placed. "
    },
    agile_cs: {
        name: "Agile Close/Siege",
        description: "Can be placed in either the Close Combat or the Siege Combat row. Cannot be moved once placed. "
    },
    agile_rs: {
        name: "Agile Ranged/Siege",
        description: "Can be placed in either the Ranged Combat or the Siege Combat row. Cannot be moved once placed. "
    },
    agile_crs: {
        name: "Agile Close/Ranged/Siege",
        description: "Can be placed in any combat row. Cannot be moved once placed. "
    },
    muster: {
        name: "Muster",
        description: "Find any cards with the same name in your deck and play them instantly. ",
        placed: async (card) => {
            if (card.isLocked())
                return;
            let pred = c => c.target === card.target;
            let units = card.holder.hand.getCards(pred).map(x => [card.holder.hand, x])
                .concat(card.holder.deck.getCards(pred).map(x => [card.holder.deck, x]));
            if (units.length === 0)
                return;
            await card.animate("muster");
            if (card.row.includes("agile")) {
                await Promise.all(units.map(async p => await board.addCardToRow(p[1], card.currentLocation, p[1].holder, p[0])));
            } else {
                await Promise.all(units.map(async p => await board.addCardToRow(p[1], p[1].row, p[1].holder, p[0])));
            }
        }
    },
    spy: {
        name: "Spy",
        description: "Place on your opponent's battlefield (counts towards your opponent's total) and draw 2 cards from your deck.",
        description_toussaint: "Place on your opponent's battlefield. Draw 3 cards from your deck. Keep one of them in your hand and shuffle the other two into the deck.",
        placed: async (card) => {
            if (card.isLocked())
                return;
            await card.animate("spy");
            // Toussaint spies have a different behaviour
            if (card.faction === "toussaint") {
                let cards = { cards: card.holder.deck.cards.slice(0, 3) };
                let targetCard = null;
                if (card.holder.controller instanceof ControllerAI) {
                    targetCard = card.holder.controller.getHighestWeightCard(cards.cards);
                } else {
                    try {
                        Carousel.curr.cancel();
                    } catch (err) { }
                    await ui.queueCarousel(cards, 1, (c, i) => targetCard = c.cards[i], c => true, true, false, "Choose the card to draw and keep");
                }
                cards.cards.forEach(c => {
                    if (c === targetCard) {
                        board.toHand(c, card.holder.deck);
                    } else {
                        // Remove to shuffle back at a random place (default behaviour on addCard in deck)
                        card.holder.deck.removeCard(c);
                        card.holder.deck.addCard(c);
                    }
                });
            } else {
                for (let i = 0; i < 2; i++) {
                    if (card.holder.deck.cards.length > 0) {
                        // If can draw from opponent's deck and not AI
                        if (card.holder.capabilities["drawOPdeck"] > 0 && !(card.holder.controller instanceof ControllerAI)) {
                            let d = await ui.popup("Own deck [E]", (p) => p.choice = card.holder.deck, "Opponent's deck [Q]", (p) => {
                                p.choice = card.holder.opponent().deck;
                                card.holder.capabilities["drawOPdeck"] -= 1;
                            }, "Choose deck to draw from", "From which deck to draw the next card, your own or the opponent's deck (" + card.holder.capabilities["drawOPdeck"] + " left in this battle)?");
                            await d.draw(card.holder.hand);
                        } else {
                            await card.holder.deck.draw(card.holder.hand);
                        }
                    }
                }
            }
            card.holder = card.holder.opponent();
        }
    },
    medic: {
        name: "Medic",
        description: "Choose one card from your discard pile and play it instantly (no Heroes or Special Cards). ",
        placed: async (card) => {
            if (card.isLocked() || (card.holder.grave.findCards(c => c.isUnit()) <= 0))
                return;
            let grave = board.getRow(card, "grave", card.holder);
            let respawns = [];
            if (game.randomRespawn) {
                for (var i = 0; i < game.medicCount; i++) {
                    if (card.holder.grave.findCards(c => c.isUnit()).length > 0) {
                        let res = grave.findCardsRandom(c => c.isUnit())[0];
                        grave.removeCard(res);
                        grave.addCard(res);
                        await res.animate("medic");
                        await res.autoplay(grave);
                    }
                }
                return;
            } else if (card.holder.controller instanceof ControllerAI) {
                for (var i = 0; i < game.medicCount; i++) {
                    if (card.holder.grave.findCards(c => c.isUnit()).length > 0) {
                        let res = card.holder.controller.medic(card, grave);
                        grave.removeCard(res);
                        grave.addCard(res);
                        await res.animate("medic");
                        await res.autoplay(grave);
                    }
                }
                return;
            }

            //Player can't pick more cards than what's actually available in the graveyard
            let cardPicks = Math.min(game.medicCount, card.holder.grave.findCards(c => c.isUnit()).length);
            await ui.queueCarousel(card.holder.grave, cardPicks, (c, i) => respawns.push({
                card: c.cards[i]
            }), c => c.isUnit(), true);
            await Promise.all(respawns.map(async wrapper => {
                let res = wrapper.card;
                grave.removeCard(res);
                grave.addCard(res);
                await res.animate("medic");
                await res.autoplay(grave);
            }));
        }
    },
    morale: {
        name: "Morale Boost",
        description: "Adds +1 to all units in the row (excluding itself). ",
        placed: async card => await card.animate("morale"),
        effectAfterMove: true
    },
    bond: {
        name: "Tight Bond",
        description: "Place next to a card with the same name to double the strength of both cards. ",
        placed: async card => {
            if (card.isLocked())
                return;
            let bonds = card.currentLocation.findCards(c => c.target === card.target).filter(c => c.abilities.includes("bond")).filter(c => !c.isLocked());
            if (bonds.length > 1)
                await Promise.all(bonds.map(c => c.animate("bond")));
        },
        effectAfterMove: true
    },
    avenger: {
        name: "Avenger",
        description: "When this card is removed from the battlefield, it summons a powerful new Unit Card to take its place. ",
        removed: async (card) => {
            if (game.over || game.roundHistory.length > 2 || card.isLocked())
                return;
            // Some avengers are related to muster and should trigger it, if not already in deck
            if (card_dict[card.target]["ability"].includes("muster") && (card.holder.deck.findCards(c => c.key === card.target).length === 0 && card.holder.hand.findCards(c => c.key === card.target).length === 0)) {
                for (let i = 0; i < card_dict[card.target]["count"]; i++) {
                    let avenger = new Card(card.target, card_dict[card.target], card.holder);
                    avenger.removed.push(() => setTimeout(() => avenger.holder.grave.removeCard(avenger), 2000));
                    if (card.target != card.key)
                        await board.addCardToRow(avenger, avenger.row, card.holder);
                }
            } else if (card.target === card.key) {
                await board.moveTo(card, card.row, card.holder.grave);
            } else {
                let avenger;
                // If one copy at least in hand or deck, use it instead of creating a duplicate
                if (card.holder.deck.findCards(c => c.key === card.target).length) {
                    avenger = card.holder.deck.findCard(c => c.key === card.target);
                    await board.moveTo(avenger, avenger.row, card.holder.deck);
                } else if (card.holder.hand.findCards(c => c.key === card.target).length) {
                    avenger = card.holder.hand.findCard(c => c.key === card.target);
                    await board.moveTo(avenger, avenger.row, card.holder.hand);
                } else {
                    avenger = new Card(card.target, card_dict[card.target], card.holder);
                    await board.addCardToRow(avenger, avenger.row, card.holder);
                    if (card.target != card.key)
                        avenger.removed.push(() => setTimeout(() => avenger.holder.grave.removeCard(avenger), 2000));
                }
            }

        },
        weight: (card) => {
            if (game.roundHistory.length > 2)
                return 1;
            return Number(card_dict[card.target]["strength"]);
        }
    },
    cintra_slaughter: {
        name: "Slaughter of Cintra",
        description: "When using the Slaugther of Cintra special card, destroy all units on your side of the board having the Slaughter of Cintra ability then draw as many cards as units destroyed.",
        activated: async card => {
            let targets = board.row.map(r => [r, r.findCards(c => c.abilities.includes("cintra_slaughter")).filter(c => c.holder === card.holder).filter(c => !c.isLocked())]);
            let cards = targets.reduce((a, p) => a.concat(p[1].map(u => [p[0], u])), []);
            let nb_draw = cards.length;
            await Promise.all(cards.map(async u => await u[1].animate("scorch", true, false)));
            await Promise.all(cards.map(async u => await board.toGrave(u[1], u[0])));
            await board.toGrave(card, card.holder.hand);

            for (let i = 0; i < nb_draw; i++) {
                if (card.holder.deck.cards.length > 0)
                    await card.holder.deck.draw(card.holder.hand);
            }
        },
        weight: (card) => 30
    },
    foltest_king: {
        description: "Pick an Impenetrable Fog or Torrential Rain card from your deck and play it instantly.",
        activated: async card => {
            let fog = card.holder.deck.findCard(c => c.key === "spe_fog");
            let rain = card.holder.deck.findCard(c => c.key === "spe_rain");
            let c = null;
            if (fog && !rain) {
                c = fog;
            } else if (rain && !fog) {
                c = rain;
            } else if (rain && fog) {
                // If both weather cards are available, let the user choose
                if (!(card.holder.controller instanceof ControllerAI)) {
                    c = await ui.popup("Impenetrable Fog [E]", (p) => p.choice = fog, "Torrential Rain [Q]", (p) => p.choice = rain, "Choose a weather card to play", "Which weather card to play? Impenetrable Fog or Torrential Rain?");
                } else {
                    if (card.holder.controller.weightWeatherFromDeck(card, "fog") >= card.holder.controller.weightWeatherFromDeck(card, "rain")) {
                        c = fog;
                    } else {
                        c = rain;
                    }
                }
            }
            if (c)
                await c.autoplay(card.holder.deck);
        },
        weight: (card, ai) => Math.max(ai.weightWeatherFromDeck(card, "fog"), ai.weightWeatherFromDeck(card, "rain"))
    },
        foltest_steelforged: {
        description: "Clear any weather effects (resulting from Biting Frost, Torrential Rain or Impenetrable Fog cards) in play.",
        activated: async () => {
          
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
            await weather.clearWeather()
        },
        weight: (card, ai) => ai.weightCard(card_dict["spe_clear"])
    },

    foltest_siegemaster: {
        description: "Doubles the strength of all your Siege units (unless a Commander's Horn is also present on that row).",
        activated: async card => await board.getRow(card, "siege", card.holder).leaderHorn(card),
        weight: (card, ai) => ai.weightHornRow(card, board.getRow(card, "siege", card.holder))
    },
    foltest_lord: {
		description: "Destroy your enemy's strongest Siege unit(s) if the combined strength of all his or her Siege units is 10 or more.",
		activated: async card => await ability_dict["scorch_s"].placed(card),
		weight: (card, ai, max) => ai.weightScorchRow(card, max, "siege")
	},
    foltest_son: {
        description: "Destroy your enemy's strongest Ranged Combat unit(s) if the combined strength of all his or her Ranged Combat units is 10 or more.",
        activated: async card => await ability_dict["scorch_r"].placed(card),
        weight: (card, ai, max) => ai.weightScorchRow(card, max, "ranged")
    },
    emhyr_imperial: {
        description: "Draw an opponent's discarded non-hero unit into your hand. Then put any card from your hand on the bottom of your deck.",
        activated: async card => {
            let opcards = { cards: card.holder.opponent().grave.cards.filter(c => c.isUnit()) };
            let owncards = { cards: card.holder.hand.cards };
            let drawCard = null, targetCard = null;

            if (opcards.cards.length > 0 && owncards.cards.length > 0) {
                if (card.holder.controller instanceof ControllerAI) {
                    let drawCard = card.holder.controller.medic(card, card.holder.opponent().grave);
                    // Draw card from OP grave
                    drawCard.holder = card.holder;
                    await board.toHand(drawCard, card.holder.opponent().grave);
                    // Pick lowest card and put it back in the deck
                    targetCard = card.holder.controller.getLowestWeightCard(owncards.cards);
                    await board.toDeck(targetCard, card.holder.hand);
                } else {
                    await ui.queueCarousel(opcards, 1, (c, i) => drawCard = c.cards[i], c => c.isUnit(), true, false, "Which card to draw?");
                    // Draw card from OP grave
                    drawCard.holder = card.holder;
                    await board.toHand(drawCard, card.holder.opponent().grave);
                    // Pick card to put back into deck
                    await ui.queueCarousel(owncards, 1, (c, i) => targetCard = c.cards[i], c => true, true, false, "Which card to put back into the deck?");
                    await board.toDeck(targetCard, card.holder.hand);
                }
            } else {
                return false;
            }
        },
        weight: (card, ai) => {
            let data = ai.countCards(card.holder.opponent().grave);
            let bestCard = card.holder.opponent().grave.cards.filter(c => c.isUnit()).sort((a, b) => b.power - a.power)[0];

            return !bestCard ? 0 : (data.spy.length ? 50 : data.medic.length ? 15 : bestCard.power);
        }
    },
    emhyr_emperor: {
        description: "Look at 4 random cards in your opponent's hand. Choose one. Opponent must play this card on his next turn (if he does not fold).",
        activated: async card => {
            let container = new CardContainer();
            container.cards = card.holder.opponent().hand.findCardsRandom(() => true, 4);
            try {
                Carousel.curr.cancel();
            } catch (err) { }
            let targetCard = null;
            // AI choses card with lowest weight
            if (card.holder.controller instanceof ControllerAI) {
                targetCard = card.holder.opponent().getAIController().getLowestWeightCard(container.cards);
            } else {
                await ui.queueCarousel(container, 1, (c, i) => targetCard = c.cards[i], c => true, true, false, "Which card should your opponent play on the next round?");
            }
            // Can't force an action if the opponent has already passed
            if (!card.holder.opponent().passed) {
                card.holder.opponent().forcedActions.push(targetCard);
            }
        },
        weight: card => {
            if (card.holder.opponent().hand.cards.length > 6 || card.holder.opponent().hand.cards.length < 4) {
                return 10;
            }
            return 20;
        }
    },
    emhyr_whiteflame: {
        description: "Passive: When using Spies or Emissaries, you may draw cards from your opponent's deck instead of your own (max 3 cards per battle).",
        placed: card => {
            card.holder.disableLeader();
            card.holder.capabilities["drawOPdeck"] = 3;
        }
    },
    emhyr_relentless: {
        description: "Destroy one unit or hero card on your battlefield. Then draw any one Spy or Emissary card from your deck into your hand.",
        activated: async card => {
            // Select own cards on the board
            let owncards = {
                cards: card.holder.getAllRowCards().filter(c => c.isUnit() || c.hero)
            };
            let spyCards = {
                cards: card.holder.deck.cards.filter(c => c.abilities.includes("spy") || c.abilities.includes("emissary"))
            };
            if (owncards.cards.length === 0 || spyCards.cards.length === 0)
                return false;

            let targetCard = null;
            let drawCard = null;
            if (card.holder.controller instanceof ControllerAI) {
                targetCard = owncards.cards.sort((a, b) => a.power - b.power)[0]; // AI takes weakest card
                drawCard = spyCards.cards.sort((a, b) => a.power - b.power)[0]; // AI takes weakest spy card
            } else {
                try {
                    Carousel.curr.cancel();
                } catch (err) { }
                await ui.queueCarousel(owncards, 1, (c, i) => targetCard = c.cards[i], c => true, true, false, "Which card to destroy?");
                await ui.queueCarousel(spyCards, 1, (c, i) => drawCard = c.cards[i], c => true, true, false, "Which Spy/Emissary card to draw?");
            }


            await board.toGrave(targetCard, board.getRow(targetCard, targetCard.row, targetCard.holder));
            await board.toHand(drawCard, card.holder.deck);
        },
        weight: (card, ai, max, data) => {
            let owncards = {
                cards: card.holder.getAllRowCards().filter(c => c.isUnit() || c.hero)
            };
            let spyCards = {
                cards: card.holder.deck.cards.filter(c => c.abilities.includes("spy") || c.abilities.includes("emissary"))
            };
            if (owncards.cards.length === 0 || spyCards.cards.length === 0)
                return 0;
            let weakestCard = owncards.cards.sort((a, b) => a.power - b.power)[0];
            if (weakestCard.power <= 7) {
                return 15;
            }
            return 0;
        }
    },
    emhyr_invader: {
        description: "Play a unit or hero card from each player's discard pile onto their respective side of the field.",
        activated: async card => {
            let opcards = { cards: card.holder.opponent().grave.cards.filter(c => c.isUnit() || c.hero) };
            let owncards = { cards: card.holder.grave.cards.filter(c => c.isUnit() || c.hero) };

            if (opcards.cards.length > 0) {
                if (card.holder.controller instanceof ControllerAI) {
                    // Pick weakest card from OP grave and play it
                    let c = card.holder.opponent().getAIController().getLowestWeightCard(opcards.cards);
                    card.holder.opponent().grave.removeCard(c);
                    card.holder.opponent().grave.addCard(c);
                    await c.autoplay(card.holder.opponent().grave);
                    if (owncards.cards.length > 0) {
                        // Pick best card from own grave and play it
                        c = card.holder.controller.getHighestWeightCard(owncards.cards);
                        card.holder.grave.removeCard(c);
                        card.holder.grave.addCard(c);
                        await c.autoplay(card.holder.grave);
                    }
                } else {
                    let op_card = null, own_card = null;
                    let backup_mode = game.mode;
                    game.mode = 3; // Briefly set as PvP to be able to intereact with the opponent's board
                    await ui.queueCarousel(opcards, 1, (c, i) => op_card = c.cards[i], c => true, true, false, "Which opponent card to restore from the grave?");
                    // Move from grave to hand
                    card.holder.opponent().grave.removeCard(op_card);
                    card.holder.opponent().hand.addCard(op_card);
                    // Enable board interaction - Force to select a destination
                    ui.showPreviewVisuals(op_card);
                    document.getElementById("click-background").classList.add("noclick");
                    card.holder.hand.cards.forEach(c => c.elem.classList.add("noclick"));
                    ui.setSelectable(op_card, true);
                    game.mode = backup_mode;
                    // When play OP card, don't end the turn but switch to the other card selection
                    if (owncards.cards.length > 0) {
                        card.holder.opponent().endturn_action = async () => {
                            card.holder.opponent().endturn_action = null;
                            await ui.queueCarousel(owncards, 1, (c, i) => own_card = c.cards[i], c => true, true, false, "Which card to restore from your grave?");
                            // Move from grave to hand
                            card.holder.grave.removeCard(own_card);
                            card.holder.hand.addCard(own_card);
                            // Enable board interaction - Force to select a destination
                            ui.showPreviewVisuals(own_card);
                            document.getElementById("click-background").classList.add("noclick");
                            card.holder.hand.cards.forEach(c => c.elem.classList.add("noclick"));
                            ui.setSelectable(own_card, true);
                            ui.enablePlayer(true);
                        };
                    }
                    // Prevent the end of turn while selecting cards
                    card.holder.endturn_action = async () => {
                        card.holder.endturn_action = null;
                    }
                    ui.enablePlayer(true);
                }
            }
        },
        weight: (card, ai, max, data) => {
            let opcards = { cards: card.holder.opponent().grave.cards.filter(c => c.isUnit() || c.hero) };
            let owncards = { cards: card.holder.grave.cards.filter(c => c.isUnit() || c.hero) };

            if (opcards.cards.length == 0 || owncards.cards.length == 0)
                return 0;
            return Math.max(0, card.holder.controller.getHighestWeightCard(owncards.cards).power - card.holder.opponent().getAIController().getLowestWeightCard(opcards.cards).power)

        }
    },
    eredin_bringer_of_death: {
        name: "Eredin : Bringer of Death",
        description: "Restore a unit card from your discard pile to your hand.",
        activated: async card => {
            let newCard;
            if (card.holder.controller instanceof ControllerAI) {
                newCard = card.holder.controller.medic(card, card.holder.grave);
            } else {
                try {
                    Carousel.curr.exit();
                } catch (err) { }
                await ui.queueCarousel(card.holder.grave, 1, (c, i) => newCard = c.cards[i], c => c.isUnit(), false, false);
            }
            if (newCard)
                await board.toHand(newCard, card.holder.grave);
        },
        weight: (card, ai, max, data) => ai.weightMedic(data, 0, card.holder)
    },
    eredin_destroyer: {
        description: "Discard 2 cards and draw 1 card of your choice from your deck.",
        activated: async (card) => {
            let hand = board.getRow(card, "hand", card.holder);
            let deck = board.getRow(card, "deck", card.holder);
            if (!(card.holder.controller instanceof ControllerAI)) {
				if (!hand || hand.cards.length < 2) {
					tocar("menu_buy", false); 
					ui.enablePlayer(true);    					return;                   
				}
			}

if (card.holder.controller instanceof ControllerAI) {
                let cards = card.holder.controller.discardOrder(card, card.holder.hand, true).splice(0, 2).filter(c => c.basePower < 7);
                await Promise.all(cards.map(async c => await board.toGrave(c, card.holder.hand)));
                card.holder.deck.draw(card.holder.hand);
                return;
            } else {
                try {
                    Carousel.curr.exit();
                } catch (err) { }
            }
            await ui.queueCarousel(hand, 2, (c, i) => board.toGrave(c.cards[i], c), () => true);
            await ui.queueCarousel(deck, 1, (c, i) => board.toHand(c.cards[i], deck), () => true, true);
        },
        weight: (card, ai) => {
            let cards = ai.discardOrder(card, card.holder.hand, true).splice(0, 2).filter(c => c.basePower < 7);
            if (cards.length < 2)
                return 0;
            return cards[0].abilities.includes("muster") ? 50 : 25;
        }
    },
    eredin_king: {
        description: "Pick any weather card from your deck and play it instantly.",
        activated: async card => {
            let deck = board.getRow(card, "deck", card.holder);
            if (card.holder.controller instanceof ControllerAI) {
                await ability_dict["eredin_king"].helper(card).card.autoplay(card.holder.deck);
            } else {
                try {
                    Carousel.curr.cancel();
                } catch (err) { }
                await ui.queueCarousel(deck, 1, (c, i) => board.toWeather(c.cards[i], deck), c => c.faction === "weather", true);
            }
        },
        weight: (card, ai, max) => ability_dict["eredin_king"].helper(card).weight,
        helper: card => {
            let weather = card.holder.deck.cards.filter(c => c.row === "weather").reduce((a, c) => a.map(c => c.name).includes(c.name) ? a : a.concat([c]), []);

            let out, weight = -1;
            weather.forEach(c => {
                let w = card.holder.controller.weightWeatherFromDeck(c, c.abilities[0]);
                if (w > weight) {
                    weight = w;
                    out = c;
                }
            });
            return {
                card: out,
                weight: weight
            };
        }
    },
    eredin_treacherous: {
        description: "Doubles the strength of all spy cards (affects both players).",
        gameStart: () => game.spyPowerMult = 2
    },
    francesca_queen: {
        description: "Destroy your enemy's strongest Close Combat unit(s) if the combined strength of all his or her Close Combat units is 10 or more.",
        activated: async card => await ability_dict["scorch_c"].placed(card),
        weight: (card, ai, max) => ai.weightScorchRow(card, max, "close")
    },
    francesca_beautiful: {
        description: "Doubles the strength of all your Ranged Combat units (unless a Commander's Horn is also present on that row).",
        activated: async card => await board.getRow(card, "ranged", card.holder).leaderHorn(card),
        weight: (card, ai) => ai.weightHornRow(card, board.getRow(card, "ranged", card.holder))
    },
    francesca_daisy: {
        description: "At the start of the game, draw 13 cards. Choose 2 and shuffle them into your deck to start with an 11-card hand.",
        placed: card => game.gameStart.push(() => {
            card.holder.disableLeader();
            for (var i = 0; i < 3; i++) {
                card.holder.deck.draw(card.holder.hand);
            }
            return true;
        })
    },
    francesca_pureblood: {
        description: "Choose 3 or less unit and/or hero cards, which lie on the opponent's battlefield. Move these cards to any other opponent's row (rows).",
        activated: async card => {
            if (card.holder.controller instanceof ControllerAI) {
                // We proceed iteratively because a same card might come up several times with a high weight, but we choose only 1 option
                // Also each change can affect the effect of later changes
                for (var i = 0; i < 3; i++) {
                    let action = card.holder.controller.weightAllCardsRowChanges(card.holder.opponent(), false)[0];
                    await board.moveToNoEffects(action.card, action.row, action.card.currentLocation );
                }
            } else {
                card.holder.endTurnAfterAbilityUse = false;
                ui.enableBoardRearrangement(card.holder.opponent(), 3);
            }
        },
        weight: (card, ai) => {
            if (card.holder.opponent().getAllRowCards().length < 3)
                return 0;
            // It's not very accurate since a same card might come up several times in top results, might be counted several times
            return ai.weightAllCardsRowChanges(card.holder.opponent(), false).slice(0, 3).reduce((t, v) => t - v.score,0);
        }
    },
    francesca_hope: {
        description: "Choose 4 or less unit and/or hero cards, which lie on your battlefield. Move these cards to your any other row (rows).",
        activated: async card => {
            if (card.holder.controller instanceof ControllerAI) {
                // We proceed iteratively because a same card might come up several times with a high weight, but we choose only 1 option
                // Also each change can affect the effect of later changes
                for (var i = 0; i < 4; i++) {
                    let action = card.holder.controller.weightAllCardsRowChanges(card.holder, true)[0];
                    await board.moveToNoEffects(action.card, action.row, action.card.currentLocation);
                }
            } else {
                card.holder.endTurnAfterAbilityUse = false;
                ui.enableBoardRearrangement(card.holder, 4);
            }
        },
        weight: (card, ai) => {
            if (card.holder.getAllRowCards().length < 4)
                return 0;
            // It's not very accurate since a same card might come up several times in top results, might be counted several times
            return ai.weightAllCardsRowChanges(card.holder, true).slice(0, 4).reduce((t, v) => t + v.score,0);
        }
    },
    crach_an_craite: {
        description: "Shuffle all cards from each player's graveyard back into their decks. You can keep one of the cards in the graveyard.",
        activated: async card => {
            let targetCard = null;
            if (card.holder.controller instanceof ControllerAI) {
                let medics = card.holder.hand.findCard(c => c.abilities.includes("medic"));
                if (medics !== undefined) {
                    let spies = card.holder.grave.findCard(c => c.abilities.includes("spy"));
                    if (spies !== undefined) {
                        targetCard = spies;
                    } else {
                        targetCard = card.holder.controller.getHighestWeightCard(card.holder.grave.cards);
                    }
                }
            } else {
                let c = await ui.popup("Keep a card [E]", (p) => p.choice = true, "Shuffle them all [Q]", (p) => p.choice = false, "Keep one card in the grave?", "Would you like to select a card to keep in your graveyard?");
                if (c) {
                    try {
                        Carousel.curr.cancel();
                    } catch (err) { }
                    await ui.queueCarousel(card.holder.grave, 1, (c, i) => targetCard = c.cards[i], c => true, true);
                }
            }

            Promise.all(card.holder.grave.cards.filter(c => c !== targetCard).map(c => board.toDeck(c, card.holder.grave)));
            await Promise.all(card.holder.opponent().grave.cards.map(c => board.toDeck(c, card.holder.opponent().grave)));
        },
        weight: (card, ai, max, data) => {
            if (game.roundCount < 2)
                return 0;
            let medics = card.holder.hand.findCard(c => c.abilities.includes("medic"));
            if (medics !== undefined)
                return 0;
            let spies = card.holder.hand.findCard(c => c.abilities.includes("spy"));
            if (spies !== undefined)
                return 0;
            if (card.holder.hand.findCard(c => c.abilities.includes("decoy")) !== undefined && (data.medic.length || data.spy.length && card.holder.deck.findCard(c => c.abilities.includes("medic")) !== undefined))
                return 0;
            return 15;
        }
    },
    king_bran: {
        description: "Once per game, at the start of any round: draw a Skellige Storm from your deck. This round, halve all weather effects on your cards.",
        placed: card => {
            card.holder.disableLeader();
            game.roundStart.push(async () => {
                let activate = false;
                if (card.holder.controller instanceof ControllerAI) {
                    let rand = randomInt(1);
                    if (rand > 0 || game.roundCount > 2) {
                        activate = true;
                    }
                } else {
                    activate = await ui.popup("Bring the Storm [E]", (p) => p.choice = true, "Maybe later [Q]", (p) => p.choice = false, "Bring the Skellige Storm?", "Would you like to draw a Skellige Storm card from your deck and halve weather effects over your units?");
                }
                if (activate) {
                    // Set half weather effect
                    card.holder.getAllRows().forEach(r => r.halfWeather = true);
                    game.roundStart.push(async () => {
                        card.holder.getAllRows().forEach(r => r.halfWeather = false);
                        return true;
                    });
                    // Now draw the card
                    let targetCard = card.holder.deck.findCard(c => c.key == "spe_storm");
                    if (targetCard) {
                        await board.toHand(targetCard, card.holder.deck);
                    }
                    return true;
                }
                return false;
            });
        }
    },
    birna: {
        description: "Draw from your deck any card with Mardroeme or Werewolf ability and play it immediatly.",
        activated: async card => {
            let targetCard = null;
            if (card.holder.controller instanceof ControllerAI) {
                let berserkers = card.holder.deck.cards.filter(c => c.abilities.includes("berserker"));
                let mard = card.holder.deck.cards.filter(c => c.abilities.includes("mardroeme"));
                let ownedberserkers = card.holder.hand.cards.filter(c => c.abilities.includes("berserker")).concat(card.holder.getAllRowCards().filter(c => c.abilities.includes("berserker")));
                let ownedmard = card.holder.hand.cards.filter(c => c.abilities.includes("mardroeme"))
                    .concat(card.holder.getAllRowCards().filter(c => c.abilities.includes("mardroeme")))
                    .concat(card.holder.getAllSpecialRowCards().filter(c => c.abilities.includes("mardroeme")));
                // We try to pick a card we are missing
                if (ownedberserkers.length > 0 && ownedmard.length == 0 && mard.length > 0) {
                    targetCard = mard[0];
                } else if (ownedberserkers.length == 0 && ownedmard.length > 0 && berserkers.length > 0) {
                    targetCard = berserkers.sort((a,b) => b.basePower - a.basePower)[0];
                } else if (berserkers.length > 0) {
                    targetCard = berserkers.sort((a, b) => b.basePower - a.basePower)[0];
                } else {
                    targetCard = mard[0];
                }
                if (targetCard) {
                    // Move from deck to hand
                    card.holder.deck.removeCard(targetCard);
                    card.holder.hand.addCard(targetCard);
                    let rows = targetCard.getPlayableRows();
                    // Lazy approach, can be improved
                    await card.holder.playCardToRow(targetCard, rows[0], false);
                }
            } else {
                try {
                    Carousel.curr.cancel();
                } catch (err) { }
                await ui.queueCarousel(card.holder.deck, 1, (c, i) => targetCard = c.cards[i], c => c.abilities.includes("berserker") || c.abilities.includes("mardroeme"), true);
                // let player select where to play the card
                card.holder.selectCardDestination(targetCard, card.holder.deck);
            }
        },
        weight: (card, ai) => {
            return 10;
        }
    },
    madman_lugos: {
        description: "Once per game at the beginning of any round your opponent must show you 2 random cards in his hand. Pick one of them and discard it.",
        placed: card => {
            card.holder.disableLeader();
            game.roundStart.push(async () => {
                let activate = false;
                if (card.holder.controller instanceof ControllerAI) {
                    let rand = randomInt(1);
                    if (rand > 0 || game.roundCount > 2) {
                        activate = true;
                    }
                } else {
                    activate = await ui.popup("Discard a card [E]", (p) => p.choice = true, "Maybe later [Q]", (p) => p.choice = false, "Discard a card from the hand of the opponent?", "Would you like to see 2 random cards from the hand of your opponent and discard one of them?");
                }
                if (activate) {
                    // Get 2 random cards
                    let candidates = { cards: card.holder.opponent().hand.findCardsRandom(c => true, 2) };
                    let targetCard = null;
                    if (card.holder.controller instanceof ControllerAI) {
                        // Lazy approach, not weighting the cards
                        if (candidates.cards.length > 0)
                            targetCard = candidates.cards[0];
                    } else {
                        await ui.queueCarousel(candidates, 1, (c, i) => targetCard = c.cards[i], c => true, true, false, "Which card to discard?");
                    }
                    if (targetCard) {
                        await board.toGrave(targetCard, card.holder.opponent().hand);
                    }
                    return true;
                }
                return false;
            });
        },
        weight: (card, ai) => {
            if (card.holder.opponent().hand.cards.length < 2 || card.holder.opponent().hand.cards.length > 5)
                return 8;
            return 12;
        }
    },
	holger_blakhand: {
		description: "At the end of your turn, you may set a card's strength to any value (Max 10). It returns to its original value after the round scoring. (Max 2 uses per battle).",
		placed: card => {
			card.holder.disableLeader();
			card.holder.capabilities["cardEdit"] = 2;
			
			game.turnEnd.push(async () => {
				if (card.holder.passed || game.currPlayer !== card.holder || card.holder.getAllRowCards().length == 0)
					return false;
				if (card.holder.capabilities["cardEdit"] < 1)
					return true;
				let activate = false;
				if (card.holder.controller instanceof ControllerAI) {
					if (card.holder.opponent().passed)
						return false;
					let targetCard = null;
					let targetValue = 0;
					let avengers = card.holder.getAllRowCards().filter(c => c.abilities.includes("avenger"));
					if (avengers.length > 0) {
						targetCard = avengers;
						targetValue = 10;
					}
					
					let maxCards = card.holder.getAllRowCards().filter(c => c.isUnit()).reduce((a, c) => (!a.length || a.power < c.power) ? [c] : a.power === c.power ? a.concat([c]) : a, []);
					if (!targetCard && maxCards.length > 0) {
						if (maxCards.length > 1 && maxCards.reduce((a, c) => a += c.power, 0) > 9) {
							targetCard = card.holder.getAllRowCards().filter(c => c.isUnit()).sort((a, b) => a.power - b.power);
							targetValue = 10;
						} else if (maxCards.length == 1 && maxCards.power > 9) {
							targetCard = card.holder.getAllRowCards().filter(c => c.isUnit()).sort((a, b) => a.power - b.power);
							if (targetCard.power < 6) {
								targetValue = 10;
							} else {
								targetCard = maxCards;
								targetValue = 0;
							}
						}
					}
					if (targetCard) {
						if (!targetCard.originalBasePower)
							targetCard.originalBasePower = targetCard.basePower;
						targetCard.basePower = targetValue;
						targetCard.temporaryPower = true;
						card.holder.capabilities["cardEdit"] -= 1;
					}
					if (card.holder.capabilities["cardEdit"] < 1)
						return true;
				} else {
					activate = await ui.popup("Change a card's strength [E]", (p) => p.choice = true, "Maybe later [Q]", (p) => p.choice = false, "Change the strength of a card?", "Would you like to change the strength of a card? It will be reset at the end of the round before scoring. (Max 2 uses per battle. Max strength: 10).");
				}
				
				if (activate && !(card.holder.controller instanceof ControllerAI)) {
					let inputPopupMovel = document.getElementById("number-popup-value");
					if (inputPopupMovel) {
						inputPopupMovel.setAttribute("max", "10");
					}

					let botonConfirmarMovel = document.querySelector("#number-popup button");
					if (botonConfirmarMovel) {
						botonConfirmarMovel.onclick = null;
						
						botonConfirmarMovel.onclick = function() {
							if (inputPopupMovel) {
								let valorIngresado = parseInt(inputPopupMovel.value, 10);
								if (!isNaN(valorIngresado) && valorIngresado > 10) {
									inputPopupMovel.value = "10";
								}
								if (!isNaN(valorIngresado) && valorIngresado < 0) {
									inputPopupMovel.value = "0";
								}
							}

							if (typeof NumberValuePopup !== "undefined" && NumberValuePopup.curr) {
								NumberValuePopup.curr.done();
								
								if (inputPopupMovel) inputPopupMovel.setAttribute("max", "999");
								botonConfirmarMovel.onclick = function() { NumberValuePopup.curr.done(); };
							}
						};
					}

					ui.enableCardPowerEdit(card.holder);
					
					setTimeout(() => {
						let cartasModificadas = card.holder.getAllRowCards().filter(c => c.basePower > 10 && c.temporaryPower);
						cartasModificadas.forEach(c => {
							if (c.basePower > 10) {
								c.basePower = 10;
								if (typeof c.update === "function") c.update();
							}
						});
						if (typeof ui !== "undefined" && typeof ui.update === "function") ui.update();
					}, 50);
				}
				return false;
			});
		},
		weight: (card, ai) => {
			let maxCards = card.holder.getAllRowCards().filter(c => c.isUnit()).reduce((a, c) => (!a.length || a.power < c.power) ? [c] : a.power === c.power ? a.concat([c]) : a, []);
			let sum = maxCards.reduce((a, c) => a += c.power, 0);
			if (sum > 9)
				return sum;
			return 0;
		}
	},

            radovid_king_redania: {
        description: "Draw three cards from your deck (excluding special cards, spies, and envoys). Play one of them immediately, shuffle the other two back into the deck.",
        activated: async (card) => {
            if (!card || !card.holder) return;
            const player = card.holder;
            
            if (!player.deck || !player.deck.cards || player.deck.cards.length === 0) return;

            let validUnitsInDeck = player.deck.cards.filter(c => {
                if (!c || typeof c.isUnit !== "function" || !c.isUnit()) return false;
                
                let isSpyOrEnvoy = false;
                if (c.ability === "spy" || c.ability === "ofiri_envoy") isSpyOrEnvoy = true;
                if (c.abilities && (c.abilities.includes("spy") || c.abilities.includes("ofiri_envoy"))) isSpyOrEnvoy = true;
                
                return !isSpyOrEnvoy;
            });
            
            if (validUnitsInDeck.length === 0) return;

            let maxCards = Math.min(3, validUnitsInDeck.length);
            let drawnCards = validUnitsInDeck.slice(0, maxCards);
            
            const tempContainer = new CardContainer();
            drawnCards.forEach(c => {
                if (c) {
                    player.deck.removeCard(c);
                    c.currentLocation = tempContainer;
                    tempContainer.cards.push(c);
                }
            });
            
            let targetCard = null;
            if (player.controller instanceof ControllerAI) {
                if (typeof player.controller.getHighestWeightCard === "function") {
                    targetCard = player.controller.getHighestWeightCard(tempContainer.cards);
                }
                if (!targetCard) targetCard = tempContainer.cards[0]; 
            } else {
                try { Carousel.curr.cancel(); } catch (err) {}
                await ui.queueCarousel(tempContainer, 1, async (container, index) => {
                    targetCard = container.cards[index];
                }, c => true, false, true, "Choose a unit to play immediately");
            }
            
            if (targetCard) {
                tempContainer.removeCard(targetCard);
                targetCard.holder = player;
                
                if (player.controller instanceof ControllerAI) {
                   
                    let targetRowName = targetCard.row || "close";
                    
                    if (typeof board !== "undefined" && typeof board.addCardToRow === "function") {
                        await board.addCardToRow(targetCard, targetRowName, player);
                    } else if (typeof board !== "undefined" && typeof board.toRow === "function") {
                        let allRows = player.getAllRows ? player.getAllRows() : [];
                        let filaDestino = Array.isArray(allRows) ? allRows.find(r => r && r.row === targetRowName) : null;
                        if (!filaDestino && board.row) filaDestino = board.row;
                        if (filaDestino) await board.toRow(targetCard, filaDestino);
                    } else {
                        let allRows = player.getAllRows ? player.getAllRows() : [];
                        let filaDestino = Array.isArray(allRows) ? allRows.find(r => r && r.row === targetRowName) : null;
                        if (!filaDestino && board.row) filaDestino = board.row;
                        if (filaDestino) {
                            filaDestino.addCard(targetCard);
                            if (typeof game.addCardElement === "function") game.addCardElement(targetCard);
                            if (typeof targetCard.placed === "function") await targetCard.placed(targetCard, filaDestino);
                        }
                    }
                } else {
                    await player.selectCardDestination(targetCard, player.deck);
                }
                await sleep(400);
            }
            
            while (tempContainer.cards.length > 0) {
                const remainingCard = tempContainer.cards[0];
                if (remainingCard) {
                    tempContainer.removeCard(remainingCard);
                    player.deck.addCard(remainingCard);
                }
            }
            
            if (typeof player.deck.shuffle === "function") {
                player.deck.shuffle();
            }
            
            if (typeof board !== "undefined" && (board.updateScores || board.updateScore)) {
                if (board.updateScores) board.updateScores(); else board.updateScore();
            }
        },
        weight: (card, ai) => {
            if (!ai || !ai.player || !ai.player.deck || !ai.player.deck.cards) return 0;
            let validUnits = ai.player.deck.cards.filter(c => {
                if (!c || typeof c.isUnit !== "function" || !c.isUnit()) return false;
                return c.ability !== "spy" && c.ability !== "ofiri_envoy" && (!c.abilities || (!c.abilities.includes("spy") && !c.abilities.includes("ofiri_envoy")));
            });
            if (validUnits.length === 0) return 0;
            return validUnits.length >= 3 ? 15 : 5;
        }
    },

    radovid_mad_king: {
        description: "Destroy the strongest card on the battlefield (it must be a unit or a hero). If there are several strongest cards, choose and destroy only one of them.",
        activated: async card => {
            let maxCards = card.holder.getAllRowCards().filter(c => c.hero || c.isUnit())
                .concat(card.holder.opponent().getAllRowCards().filter(c => c.hero || c.isUnit()))
                .reduce((a, c) => (!a.length || a[0].power < c.power) ? [c] : a[0].power === c.power ? a.concat([c]) : a, []);
            if (maxCards.length == 0)
                return false;
            let targetCard = null;
            if (card.holder.controller instanceof ControllerAI) {
                let opMax = maxCards.filter(c => c.holder === card.holder.opponent());
                if (opMax.length == 0)
                    return false;
                targetCard = opMax[0];
            } else {
                if (maxCards.length == 1) {
                    targetCard = maxCards[0];
                } else {
                    try {
                        Carousel.curr.cancel();
                    } catch (err) { }
                    await ui.queueCarousel({ cards: maxCards }, 1, (c, i) => targetCard = c.cards[i], c => true, true, false, "Choose the card to destroy");
                }
            }
            if (targetCard) {
                await targetCard.animate("scorch", true, false);
                await board.toGrave(targetCard, targetCard.currentLocation);
            }
        },
        weight: (card, ai) => {
            let maxCards = card.holder.getAllRowCards().filter(c => c.hero || c.isUnit())
                .concat(card.holder.opponent().getAllRowCards().filter(c => c.hero || c.isUnit()))
                .reduce((a, c) => (!a.length || a[0].power < c.power) ? [c] : a[0].power === c.power ? a.concat([c]) : a, []);
            if (maxCards.length < 1)
                return 0;
            for (var i = 0; i < maxCards.length; i++) {
                if (maxCards[i].holder === card.holder.opponent())
                    return maxCards[i].power;
            }
            return 0;
        }
    },
    radovid_strategist: {
        description: "Choose one hero card on your battlefield. Take it back to your hand.",
        activated: async card => {
            let heros = { cards: card.holder.getAllRowCards().filter(c => c.hero) };
            if (heros.cards.length == 0)
                return false;
            let targetCard = null;
            if (card.holder.controller instanceof ControllerAI) {
                targetCard = heros.cards[0];
            } else {
                try {
                    Carousel.curr.cancel();
                } catch (err) { }
                await ui.queueCarousel(heros, 1, (c, i) => targetCard = c.cards[i], c => true, true,false, "Choose the hero to take back into your hand");
            }
            if (targetCard) {
                board.toHand(targetCard, targetCard.currentLocation);
            }
            return true;
        },
        weight: (card, ai) => {
            let heros = card.holder.getAllRowCards().filter(c => c.hero);
            if (heros.length < 1)
                return 0;
            return 5;
        }
    },
   	anna_henrietta_duchess: {
		description: "Pick one hero card from your grave and play it immediately.",
		activated: async (card) => {
			let heros = card.holder.grave.cards.filter(c => c.hero).sort((a, b) => b.power - a.power);
			
			if (heros.length == 0) {
				if (card.holder.controller instanceof ControllerAI) {
					return true;
				}
				return false;
			}
			
			let targetCard = null;
			if (card.holder.controller instanceof ControllerAI) {
				targetCard = heros[0];
				if (targetCard && typeof targetCard.autoplay === "function") {
					targetCard.autoplay(card.holder.grave);
				}
			} else {
				await ui.queueCarousel({ cards: heros }, 1, (c, i) => targetCard = c.cards[i], c => true, true, false, "Choose the hero to play");
				if (targetCard) {
					card.holder.selectCardDestination(targetCard, card.holder.grave);
				}
			}
			return true;
		},
		weight: (card, ai) => {
			if (!ai || !ai.player || !ai.player.grave || !ai.player.grave.cards) {
				return 0;
			}
			
			let herosDisponibles = ai.player.grave.cards.filter(c => c.hero);
			if (herosDisponibles.length == 0) {
				return 0;
			}
			
			let heroeMasFuerte = herosDisponibles.sort((a, b) => b.power - a.power)[0];
			let puntuacionBase = 12 + (heroeMasFuerte ? heroeMasFuerte.power : 0);
			
			return Math.min(puntuacionBase, 30);
		}
	},

    anna_henrietta_ladyship: {
        description: "Choose a second form Monster of Toussaint from the battlefield to immediately play its weaker form. You may later transform it back.",
        activated: async card => {
            let l2monsters = card.holder.getAllRowCards().filter(c => c.meta.includes("toussaint_monster_level_2"));
            if (l2monsters.length == 0)
                return false;
            let targetCard = null;
            if (card.holder.controller instanceof ControllerAI) {
                targetCard = l2monsters[0]; 
            } else {
                await ui.queueCarousel({ cards: l2monsters }, 1, (c, i) => targetCard = c.cards[i], c => true, true, false, "Choose the monster to revert to its primal form.");
            }
            if (targetCard) {
                let newCard = new Card(targetCard.target, card_dict[targetCard.target], card.holder);
                targetCard.currentLocation.removeCard(targetCard);
                card.holder.deck.addCard(newCard);
                if (card.holder.controller instanceof ControllerAI) {
                    newCard.autoplay(card.holder.deck);
                } else {
                    // let player select where to play the card
                    card.holder.selectCardDestination(newCard, card.holder.deck);
                }
                return true;
            }
            return false;
        },
        weight: (card, ai) => {
            let l2monsters = card.holder.getAllRowCards().filter(c => c.meta.includes("toussaint_monster_level_2"));
            if (l2monsters.length == 0)
                return 0;
            return 10;
        }
    },
    anna_henrietta_little_weasel: {
        description: "Choose an enemy hero card and remove its Hero status.",
        activated: async card => {
            let heros = card.holder.opponent().getAllRowCards().filter(c => c.hero).sort((a, b) => b.power - a.power);
            if (heros.length == 0)
                return false;
            let targetCard = null;
            if (card.holder.controller instanceof ControllerAI) {
                targetCard = heros[0]; // should be the strongest
            } else {
                await ui.queueCarousel({ cards: heros }, 1, (c, i) => targetCard = c.cards[i], c => true, true, false, "Choose the enemy hero to demote.");
            }
            if (targetCard) {
                targetCard.hero = false;
                let el = targetCard.createCardElem(targetCard);
                targetCard.elem.replaceWith(el);
                targetCard.elem = el;
            }
            return true;
        },
        weight: (card, ai) => {
            return 8;
        }
    },
    lady_wood_brewess: {
        description: "When your faction ability triggers: draw 2 cards instead of 1. Play one and shuffle the other back into your deck.",
        placed: card => {
            card.holder.disableLeader();
            game.gameStart.push(async () => {
                card.holder.velenCardDraw = 2;
            });
        }
    },
    lady_wood_weavess: {
        description: "Draw a Curse card from your deck and play it immediatly.",
        activated: async card => {
            let cards = card.holder.deck.cards.filter(c => c.key == "spe_curse");
            if (cards.length == 0)
                return false;
            let targetCard = cards[0];
            if (card.holder.controller instanceof ControllerAI) {
                targetCard.autoplay(card.holder.deck);
            } else {
                // let player select where to play the card
                card.holder.selectCardDestination(targetCard, card.holder.deck);
            }
        },
        weight: card => {
            if (card.holder.opponent().passed)
                return 0;
            return 8;
        }
    },
    lady_wood_whispess: {
        description: "Take from your discard pile in your hand 3 or less unit cards, that died in the current round.",
        activated: async card => {
            let units = card.holder.grave.cards.filter(c => c.isUnit() && c.destructionRound == game.roundCount);
            if (units.length == 0)
                return false;
            let cardsCount = Math.min(3, units.length);
            let targetCards = [];
            if (card.holder.controller instanceof ControllerAI) {
                targetCards = card.holder.controller.getWeights(units).sort((a, b) => (b.weight - a.weight)).slice(0, cardsCount).map(c => c.card);
            } else {
                await ui.queueCarousel({ cards: units }, cardsCount, (c, i) => targetCards.push(c.cards[i]), c => true, true, true, "Choose up to " + String(cardsCount)+" to bring back to your hand.");
            }
            targetCards.forEach(async card => {
                await board.toHand(card, card.holder.grave);
            });
        },
        weight: card => {
            let units = card.holder.grave.cards.filter(c => c.isUnit() && c.destructionRound == game.roundCount);
            return Math.min(15, units.length * 5);
        }
    },
    ghost_tree: {
        description: "Destroy the weakest unit card on the battlefield (any player). If there are several, choose one.",
        activated: async card => {
            let rows = board.row.filter(row => !row.isShielded());
            let units = rows.reduce((a, r) => a.concat(r.minUnits()), [])
                .reduce((a, c) => (!a.length || a[0].power > c.power) ? [c] : a[0].power === c.power ? a.concat([c]) : a, []);
            let targetCard = null;
            if (units.length > 0) {
                if (card.holder.controller instanceof ControllerAI) {
                    targetCard = units.filter(c => c.holder !== card.holder)[0];
                } else {
                    if (units.length == 1) {
                        targetCard = units[0];
                    } else {
                        await ui.queueCarousel({ cards: units }, 1, (c, i) => targetCard = c.cards[i], () => true, true, false, "Choose which enemy card to destroy");
                    }
                }
            } else {
                return false;
            }
            if (targetCard) {
                await targetCard.animate("scorch", true, false);
                await board.toGrave(targetCard, targetCard.currentLocation);
            }
        },
        weight: card => {
            let rows = board.row.filter(row => !row.isShielded());
            let units = rows.reduce((a, r) => a.concat(r.minUnits()), [])
                .reduce((a, c) => (!a.length || a[0].power > c.power) ? [c] : a[0].power === c.power ? a.concat([c]) : a, [])
                .filter(c => c.holder !== card.holder);
            if (units.length == 0)
                return 0;
            return 5 + units[0].power;
            
        }
    },
    eredin_commander: {
        description: "Choose on your battlefield two or less unit and/or hero cards and take them into your hand.",
        activated: async card => {
            let cards = card.holder.getAllRowCards().filter(c => c.hero || c.isUnit());
            if (cards.length == 0)
                return false;
            let targetCards = [];
            let cardsCount = Math.min(2, cards.length);
            if (card.holder.controller instanceof ControllerAI) {
                targetCards = card.holder.controller.selectBestCards(cards, cardsCount, { "spy": 10, "zirael": 10, "medic": 8, "sage": 4, "scorch_c": 4, "scorch_r": 4 }).map(c => c.card);
            } else {
                await ui.queueCarousel({ cards: cards }, cardsCount, (c, i) => targetCards.push(c.cards[i]), c => true, true, true, "Choose up to " + String(cardsCount)+" cards to take back into your hand.");
            }
            if (targetCards.length > 0) {
                targetCards.forEach(async c => {
                    await board.moveTo(c, card.holder.hand, c.currentLocation);
                });
            }
        },
        weight: card => {
            let cards = card.holder.getAllRowCards().filter(c => c.hero || c.isUnit());
            if (cards.length == 0)
                return card.holder.controller.selectBestCards(cards, Math.min(2, cards.length), { "spy": 10, "medic": 8, "sage": 4, "scorch_c": 4 }).reduce((a,c) => a + c.weight,0);
            return 5;

        }
    },
    auberon_king: {
        description: "Draw from your deck or graveyard any number of Navigator cards. Then choose in your hand the same number of cards and put them back in any place of the deck.",
                activated: async card => {
            let navigators = card.holder.deck.cards.filter(c => c.abilities.includes("door_o"))
                .concat(card.holder.grave.cards.filter(c => c.abilities.includes("door_o")))
                .sort((a, b) => b.basePower - a.basePower);
            if (navigators.length < 1)
                return false;
                
            if (card.holder.controller instanceof ControllerAI) {
                let aiTarget = navigators[0];
                if (aiTarget) {
                    if (card.holder.grave.cards.includes(aiTarget)) {
                        await board.toHand(aiTarget, card.holder.grave);
                    } else {
                        await board.toHand(aiTarget, card.holder.deck);
                    }
                    
                    let targetCard = card.holder.controller.getLowestWeightCard(card.holder.hand.cards);
                    if (targetCard)
                        await board.toDeck(targetCard, card.holder.hand);
                }
            } else {
                let targetCards = [];
                
                let limiteManoMax = Math.min(card.holder.hand.cards.length, navigators.length);

                if (limiteManoMax === 0) {
                    await ui.notification("You have no cards in hand to exchange!", 2000);
                    return false;
                }

                await ui.queueCarousel(
                    { cards: navigators }, 
                    limiteManoMax, 
                    (c, i) => targetCards.push(c.cards[i]), 
                    c => true, 
                    true, 
                    true, 
                    "Choose up to " + String(limiteManoMax) + " cards to draw. You must put back an equal amount from your hand."
                );
                
                if (targetCards.length === 0) return true;

                let cartasParaDevolver = [];
                
                await ui.queueCarousel(
                    card.holder.hand, 
                    targetCards.length, 
                    (c, i) => cartasParaDevolver.push(c.cards[i]), 
                    c => true, 
                    true, 
                    false, 
                    "Choose " + String(targetCards.length) + " cards from your hand to put back into your deck."
                );

                for (let i = 0; i < cartasParaDevolver.length; i++) {
                    if (cartasParaDevolver[i]) {
                        await board.toDeck(cartasParaDevolver[i], card.holder.hand);
                    }
                }

                for (let i = 0; i < targetCards.length; i++) {
                    let cartaActual = targetCards[i];
                    if (cartaActual) {
                        if (card.holder.grave.cards.includes(cartaActual)) {

                            await board.toHand(cartaActual, card.holder.grave);
                        } else {
                            await board.toHand(cartaActual, card.holder.deck);
                        }
                    }
                }
            }
            return true;
        },

        weight: card => {
            let navigators = card.holder.deck.cards.filter(c => c.abilities.includes("door_o")).concat(card.holder.grave.cards.filter(c => c.abilities.includes("door_o")));
            if (navigators.length < 1 || card.holder.deck.cards.length < 4)
                return 0;
            if (card.holder.hand.cards.filter(c => c.abilities.includes("door_o")).length > 0)
                return 0;
            if (game.roundCount < 3)
                return 15;
            if (game.roundCount > 2) {
                navigators = card.holder.getAllRowCards().filter(c => c.abilities.includes("door_o"));
                if (navigators.length == 0 || (navigators.length == 1 && card.holder.leader.key == "wh_caranthir_navigator"))
                    return 15;
            }
            return 0;
        }
    },
       winter_queen: {
        description: "Draw any special card from your deck and play it immediatly.",
        activated: async card => {
            let specials = card.holder.deck.cards.filter(c => !(c.hero || c.isUnit()));
            if (specials.length < 1)
                return false;
            let targetCard = null;
            if (card.holder.controller instanceof ControllerAI) {
                let highestCardResult = card.holder.controller.getHighestWeightCard(specials);
                if (highestCardResult) {
                    targetCard = Array.isArray(highestCardResult) ? highestCardResult[0] : highestCardResult;
                }
                if (!targetCard && specials.length > 0) {
                    targetCard = specials;
                }
                if (targetCard) {
                    await targetCard.autoplay(card.holder.deck);
                    await sleep(400);
                    board.updateScores();
                }
            } else {
                await ui.queueCarousel({ cards: specials }, 1, (c, i) => targetCard = c.cards[i], c => true, true, false, "Choose a special card to play immediatly.");
                if (targetCard) {
                    let choiceDone = false;
                    card.holder.selectCardDestination(targetCard, card.holder.deck, async () => {
                        choiceDone = true;
                        ui.enablePlayer(true);
                    });
                    await sleepUntil(() => choiceDone, 100);
                }
            }
        },
        weight: card => {
            let specials = card.holder.deck.cards.filter(c => !(c.hero || c.isUnit()));
            if (specials.length < 1)
                return 0;
            let sortedWeights = card.holder.controller.getWeights(specials).sort((a, b) => b.weight - a.weight);
            return sortedWeights.length > 0 ? sortedWeights[0].weight : 0;
        }
    },
    caranthir_navigator: {
        description: "You can open two Dimensional Doors at the same time (but only if there is at least one navigator in each of these 2 rows).",
        placed: card => {
            card.holder.disableLeader();
        }
    },
    imlerith_general: {
        description: "Passive: Imlerith will shield Navigators from destruction.",
        placed: card => {
            card.holder.disableLeader();
        }
    },
    queen_calanthe: {
        description: "Play a unit then draw a card from you deck.",
        activated: async card => {
            let units = card.holder.hand.cards.filter(c => c.isUnit());
            if (units.length === 0)
                return;
            let wrapper = {
                card: null
            };
            if (card.holder.controller instanceof ControllerAI) {
                wrapper.card = units[randomInt(units.length)];
            } else {
                await ui.queueCarousel(board.getRow(card, "hand", card.holder), 1, (c, i) => wrapper.card = c.cards[i], c => c.isUnit(), true);
            }
            wrapper.card.autoplay();
            card.holder.hand.removeCard(wrapper.card);
            if (card.holder.deck.cards.length > 0)
                await card.holder.deck.draw(card.holder.hand);
        },
        weight: (card, ai) => {
            let units = card.holder.hand.cards.filter(c => c.isUnit());
            if (units.length === 0)
                return 0;
            return 15;
        }
    },
    fake_ciri: {
        description: "Discard a card from your hand and then draw two cards from your deck.",
        activated: async card => {
            if (card.holder.hand.cards.length === 0)
                return;
            let hand = board.getRow(card, "hand", card.holder);
            if (card.holder.controller instanceof ControllerAI) {
                let cards = card.holder.controller.discardOrder(card, card.holder.hand, true).splice(0, 1).filter(c => c.basePower < 7);
                await Promise.all(cards.map(async c => await board.toGrave(c, card.holder.hand)));
            } else {
                try {
                    Carousel.curr.exit();
                } catch (err) { }
                await ui.queueCarousel(hand, 1, (c, i) => board.toGrave(c.cards[i], c), () => true);
            }

            for (let i = 0; i < 2; i++) {
                if (card.holder.deck.cards.length > 0)
                    await card.holder.deck.draw(card.holder.hand);
            }
        },
        weight: (card, ai) => {
            if (card.holder.hand.cards.length === 0)
                return 0;
            return 15;
        }
    },
    radovid_stern: {
		description: "Discard 2 cards and draw 1 card of your choice from your deck.",
		activated: async (card) => {
			let hand = board.getRow(card, "hand", card.holder);
			let deck = board.getRow(card, "deck", card.holder);
			
			if (!(card.holder.controller instanceof ControllerAI)) {
				if (!hand || hand.cards.length < 2) {
					tocar("menu_buy", false); 
					ui.enablePlayer(true);    
					return;                 
				}
			}

			if (card.holder.controller instanceof ControllerAI) {
				let cards = card.holder.controller.discardOrder(card).splice(0, 2).filter(c => c.basePower < 7);
				await Promise.all(cards.map(async c => await board.toGrave(c, card.holder.hand)));
				card.holder.deck.draw(card.holder.hand);
				return;
			} else {
				try {
					Carousel.curr.exit();
				} catch (err) { }
			}
			await ui.queueCarousel(hand, 2, (c, i) => board.toGrave(c.cards[i], c), () => true);
			await ui.queueCarousel(deck, 1, (c, i) => board.toHand(c.cards[i], deck), () => true, true);
		},
		weight: (card, ai) => {
			let cards = ai.discardOrder(card).splice(0, 2).filter(c => c.basePower < 7);
			if (cards.length < 2)
				return 0;
			return cards[0].abilities.includes("muster") ? 50 : 25;
		}
	},
    radovid_ruthless: {
        description: "Cancel the scorch ability for one round",
        activated: async card => {
            game.scorchCancelled = true;
            await ui.notification("north-scorch-cancelled", 1200);
            game.roundStart.push(async () => {
                game.scorchCancelled = false;
                return true;
            });
        }
    },
    vilgefortz_magician_kovir: {
        description: "Halves the strength of all spy cards (affects both players).",
        gameStart: () => game.spyPowerMult = 0.5
    },
    cosimo_malaspina: {
        description: "Destroy your enemy's strongest Melee unit(s) if the combined strength of all his or her Melee units is 10 or more.",
        activated: async card => await ability_dict["scorch_c"].placed(card),
        weight: (card, ai, max) => ai.weightScorchRow(card, max, "close")
    },
    resilience: {
        name: "Resilience",
        description: "Remains on the board for the following round if another unit on your side of the board had an ability in common.",
        placed: async card => {
            game.roundEnd.push(async () => {
                if (card.isLocked())
                    return;
                let units = card.holder.getAllRowCards().filter(c => c.abilities.includes(card.abilities.at(-1)));
                if (units.length < 2)
                    return;
                card.noRemove = true;
                await card.animate("resilience");
                game.roundStart.push(async () => {
                    delete card.noRemove;
                    let school = card.abilities.at(-1);
                    if (!card.holder.effects["witchers"][school])
                        card.holder.effects["witchers"][school] = 0
                    card.holder.effects["witchers"][school]++;
                    return true;
                });
            });
        }
    },
    witcher_wolf_school: {
        name: "Wolf School of Witchers",
        description: "Each unit of this witcher school is boosted by 2 for each card of this given school.",
        placed: async card => {
            let school = card.abilities.at(-1);
            if (!card.holder.effects["witchers"][school])
                card.holder.effects["witchers"][school] = 0
            card.holder.effects["witchers"][school]++;
        },
        removed: async card => {
            let school = card.abilities.at(-1);
            card.holder.effects["witchers"][school]--;
        }
    },
    witcher_viper_school: {
        name: "Viper School of Witchers",
        description: "Each unit of this witcher school is boosted by 2 for each card of this given school.",
        placed: async card => {
            let school = card.abilities.at(-1);
            if (!card.holder.effects["witchers"][school])
                card.holder.effects["witchers"][school] = 0
            card.holder.effects["witchers"][school]++;
        },
        removed: async card => {
            let school = card.abilities.at(-1);
            card.holder.effects["witchers"][school]--;
        }
    },
    witcher_bear_school: {
        name: "Bear School of Witchers",
        description: "Each unit of this witcher school is boosted by 2 for each card of this given school.",
        placed: async card => {
            let school = card.abilities.at(-1);
            if (!card.holder.effects["witchers"][school])
                card.holder.effects["witchers"][school] = 0
            card.holder.effects["witchers"][school]++;
        },
        removed: async card => {
            let school = card.abilities.at(-1);
            card.holder.effects["witchers"][school]--;
        }
    },
    witcher_cat_school: {
        name: "Cat School of Witchers",
        description: "Each unit of this witcher school is boosted by 2 for each card of this given school.",
        placed: async card => {
            let school = card.abilities.at(-1);
            if (!card.holder.effects["witchers"][school])
                card.holder.effects["witchers"][school] = 0
            card.holder.effects["witchers"][school]++;
        },
        removed: async card => {
            let school = card.abilities.at(-1);
            card.holder.effects["witchers"][school]--;
        }
    },
    witcher_griffin_school: {
        name: "Griffin School of Witchers",
        description: "Each unit of this witcher school is boosted by 2 for each card of this given school.",
        placed: async card => {
            let school = card.abilities.at(-1);
            if (!card.holder.effects["witchers"][school])
                card.holder.effects["witchers"][school] = 0
            card.holder.effects["witchers"][school]++;
        },
        removed: async card => {
            let school = card.abilities.at(-1);
            card.holder.effects["witchers"][school]--;
        }
    },
    shield: {
        name: "Shield",
        description: "Protects units in the row from all abilities except weather effects.",
        weight: (card) => 30
    },
    seize: {
        name: "Seize",
        description: "Move the Melee unit(s) with the lowest strength on your side of the board/ Their abilities won't work anymore.",
        activated: async card => {
            let opCloseRow = board.getRow(card, "close", card.holder.opponent());
            let meCloseRow = board.getRow(card, "close", card.holder);
            if (opCloseRow.isShielded())
                return;
            let units = opCloseRow.minUnits();
            if (units.length === 0)
                return;
            await Promise.all(units.map(async c => await c.animate("seize")));
            units.forEach(async c => {
                c.holder = card.holder;
                await board.moveToNoEffects(c, meCloseRow, opCloseRow);
            });
            await board.toGrave(card, card.holder.hand);
        },
        weight: (card) => {
            if (card.holder.opponent().getAllRows()[0].isShielded())
                return 0;
            return card.holder.opponent().getAllRows()[0].minUnits().reduce((a, c) => a + c.power, 0) * 2
        }
    },
    lock: {
        name: "Lock",
        description: "Lock/cancels the ability of the next unit played in that row (ignores units without abilities and heroes).",
        weight: (card) => 20
    },
       knockback: {
        name: "Knockback",
        description: "Pushes all units of the selected row (Melee or Ranged) or row back towards the Siege row, ignores shields.",
        activated: async (card, row) => {
            let units = row.findCards(c => c.isUnit());
            if (units.length > 0) {
                let targetRow;
                for (var i = 0; i < board.row.length; i++) {
                    if (board.row[i] === row) {
                        if (i < 3)
                            targetRow = board.row[Math.max(0, i - 1)];
                        else
                            targetRow = board.row[Math.min(5, i + 1)];
                    }
                }
                
                await Promise.all(units.map(async c => await c.animate("knockback")));
                
                
                for (let i = 0; i < units.length; i++) {
                    let c = units[i];
                    if (c) {
                        if (c.abilities.includes("bond") || c.abilities.includes("morale") || c.abilities.includes("horn")) {
                            await board.moveTo(c, targetRow, row);
                        } else {
                            await board.moveToNoEffects(c, targetRow, row);
                        }
                    }
                }
            }
            await board.toGrave(card, card.holder.hand);
        },
        weight: (card) => {
            if (board.getRow(card, "close", card.holder.opponent()).cards.length + board.getRow(card, "ranged", card.holder.opponent()).cards.length === 0)
                return 0;
            let score = 0;
            if (board.getRow(card, "close", card.holder.opponent()).cards.length > 0 && (board.getRow(card, "close", card.holder.opponent()).effects.horn > 0 || board.getRow(card, "ranged", card.holder.opponent()).effects.weather || Object.keys(board.getRow(card, "close", card.holder.opponent()).effects.bond).length > 1 || board.getRow(card, "close", card.holder.opponent()).isShielded()))
                score = Math.floor(board.getRow(card, "close", card.holder.opponent()).cards.filter(c => c.isUnit()).reduce((a, c) => a + c.power, 0) * 0.5);
            if (board.getRow(card, "ranged", card.holder.opponent()).cards.length > 0 && (board.getRow(card, "ranged", card.holder.opponent()).effects.horn > 0 || board.getRow(card, "siege", card.holder.opponent()).effects.weather || Object.keys(board.getRow(card, "ranged", card.holder.opponent()).effects.bond).length > 1 || board.getRow(card, "ranged", card.holder.opponent()).isShielded()))
                score = Math.floor(board.getRow(card, "close", card.holder.opponent()).cards.filter(c => c.isUnit()).reduce((a, c) => a + c.power, 0) * 0.5);
            return Math.max(1, score);
        }
    },

    alzur_maker: {
        description: "Destroy one of your units on the board and summon a Koshchey.",
        activated: (card, player) => {
            player.endTurnAfterAbilityUse = false;
            ui.showPreviewVisuals(card);
            ui.enablePlayer(true);
            if (!(player.controller instanceof ControllerAI))
                ui.setSelectable(card, true);
        },
        target: "wu_koshchey",
        weight: (card, ai, max) => {
            if (ai.player.getAllRowCards().filter(c => c.isUnit()).length === 0)
                return 0;
            return ai.weightScorchRow(card, max, "close");
        }
    },
    vilgefortz_sorcerer: {
		description: "Clear all weather effects in play.",
		activated: async () => {
let cineOverlay = document.createElement("div");
			cineOverlay.className = "sunlight-overlay-cinema";

			let solarBeam = document.createElement("div");
			solarBeam.className = "sunlight-beam-wave";

			// Armamos el árbol visual y lo pegamos a pantalla completa en el HTML (body)
			cineOverlay.appendChild(solarBeam);
			document.body.appendChild(cineOverlay);

			// Destrucción automática a los 2 segundos para liberar memoria inmediatamente
			setTimeout(() => {
				if (cineOverlay) cineOverlay.remove();
			}, 2000);

			tocar("clear", false);
			await weather.clearWeather()
		},
		weight: (card, ai) => ai.weightCard(card_dict["spe_clear"])
	},
    toussaint_wine: {
        name: "Toussaint Wine",
        description: "Placed on Melee or Ranged row, boosts all units of the selected row by two. Limited to one per row.",
        placed: async card => await card.animate("morale")
    },
    meve_princess: {
        description: "If the opponent has a total of 10 or higher on one row, destroy that row's strongest card(s) (affects only the opponent's side of the battle field).",
        activated: async (card, player) => {
            player.endTurnAfterAbilityUse = false;
            ui.showPreviewVisuals(card);
            ui.enablePlayer(true);
            if (!(player.controller instanceof ControllerAI))
                ui.setSelectable(card, true);
        },
        weight: (card, ai, max) => {
            return Math.max(ai.weightScorchRow(card, max, "close"), ai.weightScorchRow(card, max, "ranged"), ai.weightScorchRow(card, max, "siege"));
        }
    },
    shield_c: {
        name: "Melee Shield",
        description: "Protects units in the Melee row from all abilities except weather effects.",
        weight: (card) => 20
    },
    shield_r: {
        name: "Ranged Shield",
        description: "Protects units in the Ranged row from all abilities except weather effects.",
        weight: (card) => 20
    },
    shield_s: {
        name: "Siege Shield",
        description: "Protects units in the Siege row from all abilities except weather effects.",
        weight: (card) => 20
    },
    meve_white_queen: {
        description: "All medic cards can choose two unit cards from the discard pile (affects both players).",
        gameStart: () => game.medicCount = 2
    },
    carlo_varese: {
        description: "If the opponent has a total of 10 or higher on one row, destroy that row's strongest card(s) (affects only the opponent's side of the battle field).",
        activated: async (card, player) => {
            player.endTurnAfterAbilityUse = false;
            ui.showPreviewVisuals(card);
            ui.enablePlayer(true);
            if (!(player.controller instanceof ControllerAI))
                ui.setSelectable(card, true);
        },
        weight: (card, ai, max) => {
            return Math.max(ai.weightScorchRow(card, max, "close"), ai.weightScorchRow(card, max, "ranged"), ai.weightScorchRow(card, max, "siege"));
        }
    },
    francis_bedlam: {
        description: "Send all spy unit cards to the grave of the side they are on.",
        activated: async (card, player) => {
            let op_spies = card.holder.opponent().getAllRowCards().filter(c => c.isUnit() && c.abilities.includes("spy"));
            let me_spies = card.holder.getAllRowCards().filter(c => c.isUnit() && c.abilities.includes("spy"));
            await op_spies.map(async c => await board.toGrave(c, c.currentLocation));
            await me_spies.map(async c => await board.toGrave(c, c.currentLocation));
        },
        weight: (card, ai, max) => {
            let op_spies = card.holder.opponent().getAllRowCards().filter(c => c.isUnit() && c.abilities.includes("spy")).reduce((a, c) => a + c.power, 0);
            let me_spies = card.holder.getAllRowCards().filter(c => c.isUnit() && c.abilities.includes("spy")).reduce((a, c) => a + c.power, 0);
            return Math.max(0, op_spies - me_spies);
        }
    },
    cyprian_wiley: {
        description: "Seize the unit(s) with the lowest strength of the opponents melee row.",
        activated: async card => {
            let opCloseRow = board.getRow(card, "close", card.holder.opponent());
            let meCloseRow = board.getRow(card, "close", card.holder);
            if (opCloseRow.isShielded())
                return;
            let units = opCloseRow.minUnits();
            if (units.length === 0)
                return;
            await Promise.all(units.map(async c => await c.animate("seize")));
            units.forEach(async c => {
                c.holder = card.holder;
                await board.moveToNoEffects(c, meCloseRow, opCloseRow);
            });
        },
        weight: (card) => {
            if (card.holder.opponent().getAllRows()[0].isShielded())
                return 0;
            return card.holder.opponent().getAllRows()[0].minUnits().reduce((a, c) => a + c.power, 0) * 2
        }
    },
    gudrun_bjornsdottir: {
        description: "Summon Flyndr's Crew",
        activated: async (card, player) => {
            let new_card = new Card("sy_flyndr_crew", card_dict["sy_flyndr_crew"], player);
            await board.addCardToRow(new_card, new_card.row, card.holder);
        },
        weight: (card, ai, max) => {
            return card.holder.getAllRows()[0].cards.length + Number(card_dict["sy_flyndr_crew"]["strength"]);
        }
    },
    cyrus_hemmelfart: {
        description: "Play a Dimeritum Shackles card in any of the opponent's row.",
        activated: async (card, player) => {
            player.endTurnAfterAbilityUse = false;
            ui.showPreviewVisuals(card);
            ui.enablePlayer(true);
            if (!(player.controller instanceof ControllerAI))
                ui.setSelectable(card, true);
        },
        weight: (card) => 20
    },
    azar_javed: {
        description: "Destroy the enemy's weakest hero card (max 1 card).",
        activated: async (card, player) => {
            let heroes = player.opponent().getAllRowCards().filter(c => c.hero);
            if (heroes.length === 0)
                return;
            let target = heroes.sort((a, b) => a.power - b.power)[0];
            await target.animate("scorch", true, false)
            await board.toGrave(target, target.currentLocation);
        },
        weight: (card, ai, max) => {
            let heroes = card.holder.opponent().getAllRowCards().filter(c => c.hero);
            if (heroes.length === 0)
                return 0;
            return heroes.sort((a, b) => a.power - b.power)[0].power;
        }
    },
    bank: {
        name: "Bank",
        description: "Draw a card from your deck.",
        activated: async card => {
            card.holder.deck.draw(card.holder.hand);
            await board.toGrave(card, card.holder.hand);
        },
        weight: (card) => 20
    },
    witch_hunt: {
        name: "Witch Hunt",
        description: "Destroy the weakest unit on the opposite row. If there are several, choose one.",
        placed: async card => {
            let row = card.currentLocation.getOppositeRow();
            if (row.isShielded() || game.scorchCancelled)
                return;
            let units = row.minUnits();
            let targetCard = null;
            if (units.length > 0) {
                if (units.length == 1 || card.holder.controller instanceof ControllerAI) {
                    targetCard = units[0];
                } else {
                    try {
                        Carousel.curr.exit();
                    } catch (err) { }
                    await ui.queueCarousel({ cards: units }, 1, (c, i) => targetCard = c.cards[i], () => true, true, false, "Choose which enemy card to destroy");
                }
            }
            if (targetCard) {
                await targetCard.animate("scorch", true, false);
                await board.toGrave(targetCard, row)
            }
        }
    },
    zerrikanterment: {
        description: "Amount of worshippers boost is doubled.",
        gameStart: () => game.whorshipBoost *= 2
    },
    baal_zebuth: {
        description: "Select 2 cards from your opponent's discard pile and shuffle them back into his/her deck.",
        activated: async (card) => {
            let grave = card.holder.opponent().grave;
            if (card.holder.controller instanceof ControllerAI) {
                let cards = grave.findCardsRandom(false, 2);
                await Promise.all(cards.map(async c => await board.toDeck(c, c.holder.grave)));
                return;
            } else {
                try {
                    Carousel.curr.exit();
                } catch (err) { }
                await ui.queueCarousel(grave, 2, (c, i) => board.toDeck(c.cards[i], c), () => true);
            }
            
        },
        weight: (card) => {
            if (card.holder.opponent().grave.cards.length < 5)
                return 0;
            else
                return 20;
        }
    },
    rarog: {
        description: "Draw a random card from the discard pile to your hand (any card) and then shuffle the rest back into the deck.",
        activated: async (card) => {
            if (card.holder.grave.cards.length === 0)
                return;
            let grave = card.holder.grave;
            let c = grave.findCardsRandom(false, 1)[0];
            await board.toHand(c, c.holder.grave);
            Promise.all(card.holder.grave.cards.map(c => board.toDeck(c, card.holder.grave)));
        },
        weight: (card) => {
            let medics = card.holder.hand.cards.filter(c => c.abilities.includes("medic"));
            if (medics.length > 0 || card.holder.grave.cards.length == 0)
                return 0;
            else
                return 15;
        }
    },
    whorshipper: {
        name: "Whorshipper",
        description: "Boost by 1 all whorshipped units on your side of the board.",
        placed: async card => {
            if (card.isLocked())
                return;
            card.holder.effects["whorshippers"]++;
        },
        removed: async card => {
            if (card.isLocked())
                return;
            card.holder.effects["whorshippers"]--;
        },
        weight: (card) => {
            let wcards = card.holder.getAllRowCards().filter(c => c.abilities.includes("whorshipped"));
            return wcards.length * game.whorshipBoost;
        }
    },
    whorshipped: {
        name: "Whorshipped",
        description: "Boosted by 1 by all whorshippers present on your side of the board.",
    },
    inspire: {
        name: "Inspire",
        description: "All units with Inspire ability take the highest base strength of the Inspire units on your side of the board. Still affected by weather.",
    },
    comrade: {
        name: "Comrade",
        description: "Once per round, this card can prevent the destruction of another card on its side of the board, including itself.",
        placed: async card => {
            if (card.isLocked())
                return;
            card.protects = true;
            return card;
        }
    },
    invoke: {
        name: "Invoke",
        description: "Invokes one of the available associated cards from the deck.",
        placed: async (card) => {
            if (card.isLocked())
                return;
            let units = card.holder.deck.findCards(c => c.target === card.target && c.key !== card.key);
            if (units.length === 0)
                return;
            await card.animate("invoke");
            await units[0].autoplay(card.holder.deck);
        }
    },
    emissary: {
        name: "Emissary",
        description: "Place on your opponent's battlefield (counts towards your opponent's total), either draw one card or look first 4 and put them back in order of choice, Once per round, some of these can be placed at the bottom.",
        placed: async card => {
            if (card.isLocked())
                return;
            let c = 1; // AI choses 1
            if (!(card.holder.controller instanceof ControllerAI)) {
                c = await ui.popup("Draw 1 card [E]", (p) => p.choice = 1, "Look first 4 cards [Q]", (p) => p.choice = 2, "Choose the effect of the emissary", "Either draw the first card of the deck or look the first 4 and order them back as you wish at the top or bottom of the deck.");
            }

            await card.animate("emissary");
            if (c == 1) {
                // Option 1 - Draw 1 card
                if (card.holder.deck.cards.length > 0) {
                    // If can draw from opponent's deck and not AI
                    if (card.holder.capabilities["drawOPdeck"] > 0 && !(card.holder.controller instanceof ControllerAI)) {
                        let d = await ui.popup("Own deck [E]", (p) => p.choice = card.holder.deck, "Opponent's deck [Q]", (p) => {
                            p.choice = card.holder.opponent().deck;
                            card.holder.capabilities["drawOPdeck"] -= 1;
                        }, "Choose deck to draw from", "From which deck to draw the next card, your own or the opponent's deck (" + card.holder.capabilities["drawOPdeck"] + " left in this battle)?");
                        await d.draw(card.holder.hand);
                    } else {
                        await card.holder.deck.draw(card.holder.hand);
                    }
                }
            } else {
                if (card.holder.deck.cards.length > 0) {
                    await ui.startDeckSorter(card.holder.deck.cards.slice(0, Math.min(4, card.holder.deck.cards.length)), card.holder, null, "Re-order the cards back into the deck", true);
                }
            }
            card.holder = card.holder.opponent();
        }
    },
    necrophage: {
        name: "Necrophage",
        description: "Choose up to 2 unit cards from your discard pile and shuffle them back into your deck.",
        placed: async card => {
            if (card.isLocked())
                return;
            let grave_units = { cards: card.holder.grave.cards.filter(c => c.isUnit()) };
            if (grave_units.cards.length == 0)
                return;
            if (card.holder.controller instanceof ControllerAI) {
                let musters = grave_units.cards.filter(c => c.abilities.includes("muster"));
                if (musters.length > 1) {
                    let groups = {};
                    // Grouping Musters together
                    musters.forEach(curr => {
                        let name = curr.target;
                        if (!groups[name])
                            groups[name] = [];
                        groups[name].push(curr);
                    });
                    //Pick the strongest muster group with at least 3 cards (1 to keep in grave, 2 to send to deck)
                    let candidates = Object.keys(groups).filter(n => groups[n].length > 2).sort((a, b) => groups[b][0].power - groups[a][0].power);
                    if (candidates.length > 0) {
                        await card.animate("necrophage");
                        board.toDeck(groups[candidates[0]][0], card.holder.grave);
                        board.toDeck(groups[candidates[0]][1], card.holder.grave);
                    }
                }
                
            } else {
                let c = await ui.popup("Yes [E]", (p) => p.choice = true, "No [Q]", (p) => p.choice = false, "Put unit cards from grave back to deck?", "Do you want to put up to 2 cards from your grave back to your deck?");
                if (c) {
                    await card.animate("necrophage");
                    await ui.queueCarousel(grave_units, 2, async (c, i) => await board.toDeck(c.cards[i], card.holder.grave), c => true, true, true, "Choose up to 2 cards to take from your grave back to your deck.");
                }
            }
        },
        // TODO: Make weightCard function call this
        weight: (card) => {
            let musters = card.holder.grave.cards.filter(c => c.isUnit() && c.abilities.includes("muster"));
            if (musters.length > 2)
                return 5;
            return 0;
        }
    },
    goetia: {
        name: "Goetia",
        description: "Place on your battlefield and take 1 card from your deck to your hand, then choose any 1 card from your hand and shuffle it into your deck.",
        placed: async card => {
            if (card.isLocked())
                return;
            if (card.holder.deck.cards.length > 0) {
                if (card.holder.controller instanceof ControllerAI) {
                    card.holder.deck.draw(card.holder.hand);
                    let targetCard = card.holder.controller.discardOrder(card, card.holder.hand, true)[0];
                    if (!targetCard) {
                        targetCard = card.holder.controller.getLowestWeightCard(card.holder.hand.cards);
                    }
                    board.toDeck(targetCard, card.holder.hand);
                } else {
                    await ui.queueCarousel(card.holder.deck, 1, async (c, i) => await board.toHand(c.cards[i], card.holder.deck), () => true, true, false, "Choose a card to draw from your deck.");
                    await ui.queueCarousel(card.holder.hand, 1, async (c, i) => await board.toDeck(c.cards[i], card.holder.hand), () => true, true, false, "Which card to put back into your deck?");
                }
                
            }
        },
        weight: (card) => {
            if (card.holder.deck.cards.length > 0)
                return 5;
            return 0;
        }
    },
    ambush: {
        name: "Ambush",
        description: "Place on your or opponent's battlefield (on any row). If opponent plays a unit or hero card on this row, you will instantly draw 2 cards from your deck into your hand. Remove the ambush to the discard pile when it has happened.",
        placed: async card => {
            if (card.isLocked())
                return;
            card.currentLocation.effects.ambush = true;
        },
        weight: (card) => {
            if (card.holder.passed)
                return 0;
            return 10;
        }
    },
    skellige_fleet: {
        name: "Skellige Fleet",
        description: "Place on your battlefield and either draw from your deck 1 top card instantly OR draw 2 top cards at the end of this round. In one round you can draw by Skellige Fleet no more than 3 cards.",
        activated: async card => {
            let c = 0;
            if (!(card.holder.controller instanceof ControllerAI)) {
                c = await ui.popup("Draw 1 now [E]", (p) => p.choice = 0, "Draw 2 later [Q]", (p) => p.choice = 1, "Draw now or more later?", "Either draw the first card of the deck now or first 2 at the end of the round.");
            } else {
                c = randomInt(1);
            }
            if (c == 0) {
                if (card.holder.deck.cards.length > 0) {
                    card.holder.deck.draw(card.holder.hand);
                }
            } else {
                game.roundEnd.push(async () => {
                    for (var i = 0; i < 2; i++) {
                        if (card.holder.deck.cards.length > 0) {
                            card.holder.deck.draw(card.holder.hand);
                        }
                    }
                    return true;
                });
            }
            await board.toGrave(card, card.holder.hand);
        },
        weight: (card) => 20
    },
    royal_decree: {
        name: "Royal Decree",
        description: "Use your leader's ability",
        activated: async card => {
            let leaderEnabled = card.holder.leaderAvailable;
            if (!card.holder.leaderAvailable)
                card.holder.leaderAvailable = true;
            await card.holder.activateLeader(false,false); // do not end turn and disable leader now
            card.holder.leaderAvailable = leaderEnabled;
            await board.toGrave(card, card.holder.hand);
        },
        weight: (card) => {
            let data_max = card.holder.controller.getMaximums();
            let data_board = card.holder.controller.getBoardData();
            return card.holder.controller.weightLeader(card.holder.leader, data_max, data_board);
        }
    },
    summon_one_of: {
        name: "Summon One Of",
        description: "Summons from anywhere (deck, grave or hand) one of the associated card of choice",
        placed: async card => {
            let targets = [];
            if (card.isLocked())
                return;
            if (card.target) {
                if (Array.isArray(card.target))
                    targets = card.target;
                else
                    targets = card.target.split(" ");
            }
            let cards = card.holder.deck.cards.filter(c => targets.includes(c.key))
                .concat(card.holder.hand.cards.filter(c => targets.includes(c.key)))
                .concat(card.holder.grave.cards.filter(c => targets.includes(c.key)));
            if (cards.length > 0) {
                let targetCard = null;
                if (cards.length > 1) {
                    if (card.holder.controller instanceof ControllerAI) {
                        targetCard = card.holder.controller.getHighestWeightCard(cards);
                    } else {
                        await ui.queueCarousel({ cards: cards }, 1, async (c, i) => targetCard = c.cards[i], () => true, true, false, "Choose one card to play.");
                    }
                } else {
                    targetCard = cards[0];
                }
                if (targetCard) {
                    await targetCard.autoplay(targetCard.currentLocation);
                }
            }
        },
        weight: (card) => {
            let targets = [];
            if (card.target) {
                if (Array.isArray(card.target))
                    targets = card.target;
                else
                    targets = card.target.split(" ");
            }
            let cards = card.holder.deck.cards.filter(c => targets.includes(c.key))
                .concat(card.holder.hand.cards.filter(c => targets.includes(c.key)))
                .concat(card.holder.grave.cards.filter(c => targets.includes(c.key)));
            if (cards.length > 0)
                return 10;
            return 0;
        }
    },
    immortal: {
        name: "Immortal",
        description: "Card stays on the battlefield for 2 rounds and cannot be destroyed by another ability",
        placed: async card => {
            if (card.isLocked())
                return;
            game.roundEnd.push(async () => {
                card.noRemove = true;
                await card.animate("immortal");
                game.roundStart.push(async () => {
                    delete card.noRemove;
                    return true;
                });
                return true;
            });
        },
        weight: (card) => {
            return card.basePower;
        }
    },
    monster_toussaint: {
        name: "Monster of Toussaint",
        description: "In any round turn, starting from the next, instead of playing a card from your hand you can remove this card from the game and instantly play its second strongest form.",
        placed: async card => {
        },
        weight: (card) => {
            return 5;
        }
    },
    aerondight: {
        name: "Aerondight",
        description: "Place on your battlefield than take the unit card with highest original strength and move it to the siege row. While it lies in the siege row, its strength is tripled.",
        placed: async card => {
            if (card.isLocked())
                return;
            let maxCards = card.holder.getAllRowCards().filter(c => c.isUnit())
                .reduce((a, c) => (!a.length || a[0].basePower < c.basePower) ? [c] : a[0].basePower === c.basePower ? a.concat([c]) : a, []);
            if (maxCards.length > 0) {
                let targetCard = null;
                if (maxCards.length == 1 || card.holder.controller instanceof ControllerAI) {
                    targetCard = maxCards[0];
                } else {
                    await ui.queueCarousel({ cards: maxCards }, 1, async (c, i) => targetCard = c.cards[i], () => true, true, false, "Choose which card to equip with Aerondight.");
                }
                if (targetCard) {
                    let targetRow = board.getRow(card, "siege", card.holder);
                    if (targetCard.currentLocation !== targetRow) {
                        await board.moveToNoEffects(targetCard, targetRow, targetCard.currentLocation);
                    }
                    targetCard.multiplier = 3;
                    targetRow.updateScore();
                    await targetCard.animate("aerondight");
                }
            }
        },
        weight: (card) => {
            let maxCards = card.holder.getAllRowCards().filter(c => c.isUnit())
                .reduce((a, c) => (!a.length || a[0].basePower < c.basePower) ? [c] : a[0].basePower === c.basePower ? a.concat([c]) : a, []);
            if (maxCards.length == 0)
                return 0;
            return 3 * maxCards[0].basePower;
        }
    },
    bait: {
        name: "Bait",
        description: "Place on your battlefield and draw from your deck one card with Tight Bond ability. Play it immediatly.",
        placed: async card => {
            if (card.isLocked())
                return;
            let cards = card.holder.deck.cards.filter(c => c.abilities.includes("bond"));
            if (cards.length > 0) {
                let targetCard = null;
                if (cards.length > 1) {
                    if (card.holder.controller instanceof ControllerAI) {
                        targetCard = card.holder.controller.getHighestWeightCard(cards);
                    } else {
                        await ui.queueCarousel({ cards: cards }, 1, async (c, i) => targetCard = c.cards[i], () => true, true, false, "Choose one card to play.");
                    }
                } else {
                    targetCard = cards[0];
                }
                if (targetCard) {
                    if (card.holder.controller instanceof ControllerAI) {
                        targetCard.autoplay(card.holder.deck);
                    } else {
                        // let player select where to play the card
                        card.holder.selectCardDestination(targetCard, card.holder.deck);
                    }
                }
            }
        },
        weight: (card) => {
            return 10;
        }
    },
    soothsayer: {
        name: "Soothsayer",
        description: "Place on your battlefield. For each soothsayer card on your side of the battlefield, you can draw one more card to choose from.",
        weight: (card) => {
            return 10;
        }
    },
    curse: {
        name: "Curse",
        description: "Place on your or opponent's battlefield on any row. Next unit card (not hero) that will be placed on this row will be destroyed and it's abilities will not work",
        weight: (card) => 20
    },
    door: {
        name: "Dimensional Door",
        description: "While the door is active, at the end of each of your turns you should draw one card from your deck. If the row of the card matches the row of the door, play it immediatly, otherwise put it back into the deck. If it does not have a row, you can play it or put it back into the deck.",
        weight: (card) => 0
    },
    door_o: {
        name: "Dimensional Door Opening",
        description: "Opens the dimensional door of the row it is in, if none other is opened",
        weight: (card) => 0,
        placed: async card => {
            if (card.isLocked())
                return;
            let openedDoors = card.holder.getAllRows().map(r => r.special).reduce((a, c) => a.concat(c.cards.filter(c => c.key === "spe_dimensional_door" && c.faceUp)), []);
            if (openedDoors.length == 0 || (card.holder.leader.key === "wh_caranthir_navigator" && openedDoors.length < 2)) {
                let door = card.currentLocation.special.findCard(c => c.key === "spe_dimensional_door");
                if (door && !door.faceUp)
                    door.flip();
            }
        },
        removed: async (card) => {
            // If last navigator in row, close the door
            let navigators = card.currentLocation.cards.filter(c => c.abilities.includes("door_o"));
            if (navigators.length == 0) {
                let door = card.currentLocation.special.findCard(c => c.key === "spe_dimensional_door");
                if (door && door.faceUp)
                    door.flip();
            }
        }
    },
    sage: {
        name: "Sage",
        description: "Place on your battlefield and draw 4 cards from your deck. Look at them and put them back at the top or bottom of the deck in the order of your choice.",
        weight: (card) => 20,
        placed: async card => {
            if (card.isLocked())
                return;
            if (card.holder.controller instanceof ControllerAI)
                return; // Meh, too tricky to implement for the AI, just skip
            if (card.holder.deck.cards.length > 0) {
                await ui.startDeckSorter(card.holder.deck.cards.slice(0, Math.min(4, card.holder.deck.cards.length)), card.holder, null, "Re-order the cards back into the deck", true);
            }
        }
    },
                zirael: {
        name: "Zirael",
        description: "Place on your battlefield. Reveal 5 cards from your deck and choose up to 2 to add to your hand. Shuffle the rest back into the deck.",
        weight: (card) => 20,
        placed: async (card) => {
            if (!card || !card.holder || card.isLocked()) return;
            
            
            if (card.ziraelTriggered) return;
            card.ziraelTriggered = true;

            tocar("game_buy", false);
            const player = card.holder;

            if (player.controller instanceof ControllerAI) {
                for (let i = 0; i < 2; i++) {
                    if (player.deck && player.deck.cards && player.deck.cards.length > 0) {
                        if (typeof player.deck.draw === "function") {
                            await player.deck.draw(player.hand);
                        } else {
                            let aiCard = player.deck.cards.shift();
                            if (aiCard) {
                                aiCard.holder = player;
                                player.hand.addCard(aiCard);
                                if (aiCard.elem) aiCard.elem.remove();
                            }
                        }
                    }
                }

                if (typeof player.updateHandCount === "function") {
                    player.updateHandCount();
                } else if (typeof board !== "undefined" && board.updateLeader) {
                    board.updateLeader();
                }

                if (typeof player.deck.shuffle === "function") {
                    player.deck.shuffle();
                }
            } else {
                if (!player.deck || player.deck.cards.length === 0) return;

                let maxPool = Math.min(5, player.deck.cards.length);
                let cards = { cards: player.deck.cards.slice(0, maxPool) };
                let targetCards = [];
                
                try { Carousel.curr.cancel(); } catch (err) {}
                
                await ui.queueCarousel(cards, 2, (container, index) => {
                    targetCards.push(container.cards[index]);
                }, c => true, true, false, "Choose up to 2 cards to draw and keep in your hand");

                for (let i = 0; i < cards.cards.length; i++) {
                    let c = cards.cards[i];
                    if (c) {
                        if (targetCards.includes(c)) {
                            c.holder = player;
                            if (typeof board !== "undefined" && typeof board.toHand === "function") {
                                await board.toHand(c, player.deck);
                            } else {
                                player.deck.removeCard(c);
                                player.hand.addCard(c);
                                if (c.elem) c.elem.remove();
                            }
                            await sleep(400);
                        } else {
                            player.deck.removeCard(c);
                            player.deck.addCard(c);
                        }
                    }
                }

                if (typeof player.deck.shuffle === "function") {
                    player.deck.shuffle();
                }

                if (typeof ui.enablePlayer === "function") {
                    ui.enablePlayer(true);
                }
            }

            if (typeof board !== "undefined" && board.updateScore) {
                board.updateScore();
            }
        }
    },
        naglfar: {
        name: "Naglfar",
        description: "Place on your battlefield and draw 2 cards or less from your deck with the word 'Naglfar' in their name and play them immediatly.",
        weight: (card) => 20,
        placed: async card => {
            if (card.isLocked())
                return;

            let cards = card.holder.deck.cards.filter(c => c.name.toLowerCase().includes("naglfar"));
            if (cards.length == 0)
                return;

            let targetCards = [];

            if (card.holder.controller instanceof ControllerAI) {
                targetCards = card.holder.controller.getWeights(cards).sort((a, b) => b.weight - a.weight).slice(0, Math.min(2, cards.length)).map(c => c.card);
                
                for (var i = 0; i < targetCards.length; i++) {
                    let c = targetCards[i];
                    card.holder.deck.removeCard(c);
                    
                    let filaDestino = card.currentLocation;
                    if (filaDestino) {
                        filaDestino.addCard(c);
                        c.currentLocation = filaDestino;
                        
                        if (typeof game.addCardElement === "function") {
                            game.addCardElement(c);
                        } else if (typeof filaDestino.addCardElement === "function") {
                            filaDestino.addCardElement(c);
                        }
                        
                        if (typeof c.placed === "object" && c.placed.length > 0) {
                            for (let x of c.placed) {
                                await x(c, filaDestino);
                            }
                        }
                    }
                }
                await sleep(500);
                board.updateScores();
                if (typeof game.resize === "function") game.resize();
            } else {
                await ui.queueCarousel({ cards: cards }, Math.min(2, card.holder.deck.cards.length), (c, i) => targetCards.push(c.cards[i]), c => true, true, true, "Choose up to 2 cards to play right away.");
                
                for (var i = 0; i < targetCards.length; i++) {
                    let c = targetCards[i];
                    let choiceDone = false;
                    card.holder.selectCardDestination(c, card.holder.deck, async () => {
                        choiceDone = true;
                        ui.enablePlayer(true);
                    });
                    await sleepUntil(() => choiceDone, 100);
                }
            }
        }
    },

};

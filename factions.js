"use strict"

var factions = {
    realms: {
        name: "Northern Realms",
        factionAbility: player => game.roundStart.push(async () => {
            if (game.roundCount > 1 && game.roundHistory[game.roundCount - 2].winner !== player) {
                player.deck.draw(player.hand);
                await ui.notification("north", 1200);
            }
            return false;
        }),
        activeAbility: false,
        abilityUses: 0,
        description: "Draw a card from your deck whenever you lose a round.",
        unavailableSpecials: []
    },
    nilfgaard: {
        name: "Nilfgaardian Empire",
        description: "Wins any round that ends in a draw.",
        activeAbility: false,
        abilityUses: 0,
        unavailableSpecials: []
    },
    monsters: {
        name: "Monsters",
        factionAbility: player => { 
            game.gameStart.push(() => { player.capabilities["endTurnRetake"] = 1; return true; });
            game.roundEnd.push(async () => {
                if (player.capabilities["endTurnRetake"] < 1)
                    return false;
                
                let cartasValidas = player.getAllRowCards().filter(c => c && c.isUnit && c.isUnit() && !c.hero);
                let cards = new CardContainer();
                cards.cards = cartasValidas;
                
                if (cards.cards.length == 0) {
                    return false;
                }
                
                let retakeCard = null;
                if (player.controller instanceof ControllerAI) {
                    retakeCard = player.controller.medic(player.leader, cards);
                    
                    if (!retakeCard || typeof retakeCard === "undefined") {
                        return false;
                    }
                    
                    player.capabilities["endTurnRetake"] = 0;
                    await ui.notification("monsters", 1200);
                    let ubicacionOrigen = (retakeCard && retakeCard.currentLocation) ? retakeCard.currentLocation : player.board;
                    await board.toHand(retakeCard, ubicacionOrigen);
                    return true;
                } else {
                    let c = await ui.popup("Retake a card [E]", (p) => p.choice = true, "Not yet [Q]", (p) => p.choice = false, "Would you like to retake one of your cards?", "Once per battle, you may retake any of your cards from the board to your hand.");
                    if (c) {
                        await ui.queueCarousel(cards, 1, (c, i) => retakeCard = c.cards[i], c => true, true, false, "Which card to retake?");
                        
                        if (!retakeCard || typeof retakeCard === "undefined") {
                            return false;
                        }
                        
                        player.capabilities["endTurnRetake"] = 0;
                        await ui.notification("monsters", 1200);
                        let ubicacionOrigenHumano = (retakeCard && retakeCard.currentLocation) ? retakeCard.currentLocation : player.board;
                        await board.toHand(retakeCard, ubicacionOrigenHumano);
                        return true;
                    }
                }
                
                return false;
            });
        },
        description: "Once per battle, at the end of the round, you may take one card back to your hand.",
        activeAbility: false,
        abilityUses: 0,
        unavailableSpecials: []
    },


    scoiatael: {
        name: "Scoia'tael",
        factionAbility: player => game.roundStart.push(async () => {
            let notif = "";
            if (!game.isPvP() && player === player_me && !(player.controller instanceof ControllerAI)) {
                await ui.popup("Go First [E]", () => game.currPlayer = player, "Let Opponent Start [Q]", () => game.currPlayer = player.opponent(), "Would you like to go first?", "The Scoia'tael faction perk allows you to decide each round who will get to go first.");
                notif = game.currPlayer.tag + "-first";
            } else if (game.isPvP()) {
                await ui.popup("Player 1 first [E]", () => game.currPlayer = player_me, "Player 2 first [Q]", () => game.currPlayer = player_op, "Who should go first?", "The Scoia'tael faction perk allows you to decide each round who will get to go first.");
                notif = game.currPlayer.tag + "-first";
            } else if (player.controller instanceof ControllerAI) {
                if (Math.random() < 0.5) {
                    game.currPlayer = player;
                    notif = "scoiatael";
                } else {
                    game.currPlayer = player.opponent();
                    notif = game.currPlayer.tag + "-first";
                }
            }
            //Tricky bit, sides are actually swapped shortly after
            game.currPlayer = game.currPlayer.opponent(); 
            // If first round, set first player too
            if (game.roundCount == 1)
                game.firstPlayer = game.currPlayer;
            await ui.notification(notif, 1200);
            return false;
        }),
        description: "Decides who takes first turn on each round.",
        activeAbility: false,
        abilityUses: 0,
        unavailableSpecials: []
    },
    skellige: {
        name: "Skellige",
        factionAbility: player => game.roundStart.push(async () => {
            if (game.roundCount != 3)
                return false;
            await ui.notification("skellige-" + player.tag, 1200);
            await Promise.all(player.grave.findCardsRandom(c => c.isUnit(), 2).map(c => board.toRow(c, player.grave)));
            return true;
        }),
        description: "At the start of round three, randomly play 2 cards from the graveyard onto the battlefield.",
        activeAbility: false,
        abilityUses: 0,
        unavailableSpecials: []
    },
    witcher_universe: {
        name: "Witcher Universe",
        factionAbility: async player => {
            await ui.notification("witcher_universe", 1200);
        },
        factionAbilityInit: player => game.roundStart.push(async () => {
            player.updateFactionAbilityUses(1);
            return false;
        }),
        description: "Can skip a turn once every round.",
        activeAbility: true,
        abilityUses: 1,
        weight: (player) => {
            return 20;
        },
        unavailableSpecials: ["spe_frost", "spe_rain", "spe_fog", "spe_scorch"]
    },
    toussaint: {
        name: "Toussaint",
        factionAbility: async player => {
            let monsters = player.getAllRowCards().filter(c => c.abilities.includes("monster_toussaint") && !c.isLocked());
            if (monsters.length < 1)
                return;
            let targetCard = null;
            if (player.controller instanceof ControllerAI) {
                let targets = monsters.map(c => new Card(c.target, card_dict[c.target], player));
                let best = player.controller.getHighestWeightCard(targets);
                if(best)
                    targetCard = monsters.filter(c => c.target === best.key)[0];
            } else {
                await ui.queueCarousel({ cards: monsters }, 1, async (c, i) => targetCard = c.cards[i], () => true, true, false, "Choose which monster to transform.");
            }
            if (targetCard) {
                let newCard = new Card(targetCard.target, card_dict[targetCard.target], player);
                targetCard.currentLocation.removeCard(targetCard);
                player.deck.addCard(newCard);
                //await board.addCardToRow(newCard, targetCard.currentLocation, player);
                if (player.controller instanceof ControllerAI) {
                    newCard.autoplay(player.deck);
                } else {
                    // let player select where to play the card
                    player.selectCardDestination(newCard, player.deck);
                }
            }
        },
        factionAbilityInit: player => {
            game.gameStart.push(async () => {
                player.mulliganCount = 3;
                return true;
            });
            game.turnStart.push(async () => {
                if (player.getAllRowCards().filter(c => c.abilities.includes("monster_toussaint")).length > 0)
                    player.updateFactionAbilityUses(1);
                else
                    player.updateFactionAbilityUses(0);
                return false;
            })
        },
        weight: (player) => {
            let monsters = player.getAllRowCards().filter(c => c.abilities.includes("monster_toussaint") && !c.isLocked());
            if (monsters.length < 1)
                return 0;
            let targets = monsters.map(c => new Card(c.target, card_dict[c.target], player));
            let w = player.controller.getWeights(targets).sort((a, b) => (b.weight - a.weight));
            return w[0].weight;
        },
        activeAbility: true,
        abilityUses: 0,
        description: "Game Start: Redraw 3 cards instead of 2. Your turn: Transform a Toussaint Monster into its next form instead of playing a card.",
        unavailableSpecials: []
    },
    lyria_rivia: {
        name: "Lyria & Rivia",
        factionAbility: player => {
            let card = new Card("spe_lyria_rivia_morale", card_dict["spe_lyria_rivia_morale"], player);
            card.removed.push(() => setTimeout(() => card.holder.grave.removeCard(card), 2000));
            card.placed.push(async () => await ui.notification("lyria_rivia", 1200));
            player.endTurnAfterAbilityUse = false;
            ui.showPreviewVisuals(card);
            ui.enablePlayer(true);
            if (!(player.controller instanceof ControllerAI))
                ui.setSelectable(card, true);
        },
        activeAbility: true,
        abilityUses: 1,
        description: "Apply a Morale Boost effect in the selected row (boost all units by 1 in this turn).",
        weight: (player) => {
            let units = player.getAllRowCards().concat(player.hand.cards).filter(c => c.isUnit()).filter(c => !c.abilities.includes("spy"));
            let rowStats = {
                "close": 0,
                "ranged": 0,
                "siege": 0,
                "agile": 0
            };
            units.forEach(c => {
                rowStats[c.row] += 1;
            });
            rowStats["close"] += rowStats["agile"];
            return Math.max(rowStats["close"], rowStats["ranged"], rowStats["siege"]);
        },
        unavailableSpecials: []
    },
    syndicate: {
        name: "Syndicate",
        factionAbility: player => game.gameStart.push(async () => {
            let card = new Card("sy_sigi_reuven", card_dict["sy_sigi_reuven"], player);
            await board.addCardToRow(card, card.row, card.holder);
        }),
        activeAbility: false,
        abilityUses: 0,
        description: "Starts the game with the Hero card Sigi Reuven on the board.",
        unavailableSpecials: []
    },
    zerrikania: {
        name: "Zerrikania",
        factionAbility: player => game.roundStart.push(async () => {
            if (game.roundCount > 1 && !(game.roundHistory[game.roundCount - 2].winner === player)) {
                if (player.grave.findCards(c => c.isUnit()) <= 0)
                    return;
                let grave = player.grave;
                let respawns = [];
                if (player.controller instanceof ControllerAI) {
                    respawns.push({
                        card: player.controller.medic(player.leader, grave)
                    });
                } else {
                    await ui.queueCarousel(player.grave, 1, (c, i) => respawns.push({
                        card: c.cards[i]
                    }), c => c.isUnit(), true);
                }
                await Promise.all(respawns.map(async wrapper => {
                    let res = wrapper.card;
                    grave.removeCard(res);
                    grave.addCard(res);
                    await res.animate("medic");
                    await res.autoplay(grave);
                }));
                await ui.notification("zerrikania", 1200);
            }
            return false;
        }),
        activeAbility: false,
        abilityUses: 0,
        description: "Restore a unit card of your choice whenever you lose a round.",
        unavailableSpecials: ["spe_frost", "spe_rain", "spe_fog"]
    },
    redania: {
        name: "Redania",
        factionAbility: async player => {
            await ui.notification("redania", 1200);
        },
        factionAbilityInit: player => game.gameStart.push(async () => {
            player.updateFactionAbilityUses(1);
            return false;
        }),
        description: "Can skip a turn once per game.",
        activeAbility: true,
        abilityUses: 1,
        weight: (player) => {
            return 20;
        },
        unavailableSpecials: ["spe_scorch"]
    },
        velen: {
        name: "Velen",
        factionAbilityAction: async player => {
            if (!player || !player.deck || player.deck.cards.length === 0) return;
            
            if (player.velenLockAction) return;
            player.velenLockAction = true;
            
            await ui.notification("velen", 1000);
            
            let targetCard = player.deck.cards[0];
            
            if (targetCard) {
                if (player.controller instanceof ControllerAI) {
                    player.deck.removeCard(targetCard);
                    targetCard.holder = player;
                    player.hand.addCard(targetCard);
tocar("game_buy", false);                    
                    if (typeof player.updateHandCount === "function") {
                        player.updateHandCount();
                    } else if (board && typeof board.updateLeader === "function") {
                        board.updateLeader();
                    }
                } else {
tocar("game_buy", false);
                    if (typeof board !== "undefined" && typeof board.toHand === "function") {
                        targetCard.holder = player;
                        await board.toHand(targetCard, player.deck);
                    } else if (typeof player.deck.draw === "function") {
                        await player.deck.draw(player.hand);
                    } else {
                        player.deck.removeCard(targetCard);
                        targetCard.holder = player;
                        player.hand.addCard(targetCard);
                        if (targetCard.elem) targetCard.elem.remove();
                    }
                }
                
               
            }
            
            if (player.destroyedCards > 0) {
                player.destroyedCards -= 1;
            }
            
            player.velenLockAction = false;
            
            if (player.destroyedCards > 0 && typeof factions["velen"] !== "undefined") {
                await sleep(500);
                await factions["velen"].factionAbilityAction(player);
            }
            
            if (typeof board !== "undefined") {
                if (board.updateScores) board.updateScores(); else if (board.updateScore) board.updateScore();
            }
        },
        factionAbility: player => {
            game.gameStart.push(async () => {
                player.destroyedCards = 0;
                player.velenCardDraw = 1;
                return false;
            });
        
            game.roundStart.push(async () => {
                player.destroyedCards = 0;
                player.velenLockAction = false;
                return false;
            });
            game.unitDestroyed.push(async c => {
                if (c && typeof c.isUnit === "function" && c.isUnit()) {
                    let allMyCards = player.getAllRowCards ? player.getAllRowCards() : [];
                    let soothsayerCount = allMyCards.filter(unit => unit && unit.abilities && unit.abilities.includes("soothsayer")).length;
                    
                    player.destroyedCards += (1 + soothsayerCount);
                }
            });
            game.turnEnd.push(async () => {
                if (game.currPlayer === player && player.destroyedCards > 0) {
                    await factions["velen"].factionAbilityAction(player);
                }
            });
        },
        description: "When a unit is destroyed draw a card at the turn's end. Each active Soothsayer adds +1 draw.",
        activeAbility: false,
        abilityUses: 0,
        weight: (player) => {
            return 0;
        },
        unavailableSpecials: []
    },
             wild_hunt: {
        name: "Wild Hunt",
                factionAbilityAction: async player => {
            if (!player || !player.deck || player.deck.cards.length == 0)
                return;
            
            let openedDoors = player.getAllRows().map(r => r.special).reduce((a, c) => a.concat(c.cards.filter(c => c.key === "spe_dimensional_door" && c.faceUp)), []);
            if (openedDoors.length > 0) {
                for (var i = 0; i < openedDoors.length; i++) {
                    if (player.deck.cards.length > 0) {
                        let door = openedDoors[i];
                        let card = null;
                        
                        try {
                            card = player.deck.cards.shift();
                        } catch (deckErr) {
                            console.warn("Extracción de última carta controlada.");
                        }
                        
                        if (!card) continue;
                        
                        ui.showPreviewVisuals(card);
                        await sleep(2000);
                        let play = false;
                        if (card.hero || card.isUnit()) {
                            if (card.getPlayableRows().filter(r => r === door.currentLocation.row).length > 0) {
                                play = true;
                            } else {
                                if (typeof ui.helper !== "undefined" && ui.helper.showMessage) {
                                    ui.helper.showMessage("Card drawn cannot be played on a row with an opened door.", 2);
                                }
                            }
                        } else {
                            if (!(player.controller instanceof ControllerAI)) {
                                play = await ui.popup("Play [E]", (p) => p.choice = true, "Discard [Q]", (p) => p.choice = false, "Play the card?", "Do you want to play this special card or put it back in the deck?");
                            } else {
                                if (player.controller.getWeights && player.controller.getWeights([card]).weight > 0)
                                    play = true;
                            }  
                        }
                        
                        if (typeof ui.preview !== "undefined" && ui.preview.classList) {
                            ui.preview.classList.add("hide");
                        }
                        ui.previewCard = null;
                        
                        if (play) {
                            if (!(player.controller instanceof ControllerAI)) {
                                let choiceDone = false;
                                player.selectCardDestination(card, player.deck, async () => {
                                    choiceDone = true;
                                    if (typeof ui.enablePlayer === "function") ui.enablePlayer(true);
                                });
                                await sleepUntil(() => choiceDone, 100);
                            } else {
                                let filaDestino = player.getAllRows().find(r => r.special.cards.includes(door));
                                if (card.name === "Decoy" || !filaDestino) {
                                    player.deck.addCard(card);
                                } else if (card.key === "spe_scorch" || card.name === "Scorch") {
                                    if (typeof player.getAIController === "function" && player.getAIController().playCardDefault) {
                                        await player.getAIController().playCardDefault(card, player.deck);
                                    } else if (player.controller.playCardDefault) {
                                        await player.controller.playCardDefault(card, player.deck);
                                    }
                                    await sleep(600);
                                    if (typeof board !== "undefined" && board.updateScores) board.updateScores();
                                } else {
                                    if (card.row === "weather") {
                                        let contenedorClima = (typeof weather !== "undefined") ? weather : filaDestino.special;
                                        contenedorClima.addCard(card);
                                        card.currentLocation = contenedorClima;
                                        if (typeof game.addCardElement === "function") {
                                            game.addCardElement(card);
                                        } else if (typeof contenedorClima.addCardElement === "function") {
                                            contenedorClima.addCardElement(card);
                                        }
                                        if (typeof card.placed === "object" && card.placed.length > 0) {
                                            for (let x of card.placed) { await x(card, contenedorClima); }
                                        } else if (typeof board.updateWeather === "function") {
                                            await board.updateWeather();
                                        }
                                    } else if (!card.isUnit() && !card.hero) {
                                        if (typeof player.playCard === "function") {
                                            await player.playCard(card, filaDestino);
                                        } else if (player.controller.playCardDefault) {
                                            await player.controller.playCardDefault(card, player.deck); 
                                        }
                                    } else {
                                        filaDestino.addCard(card);
                                        card.currentLocation = filaDestino;
                                        if (typeof game.addCardElement === "function") {
                                            game.addCardElement(card);
                                        } else if (typeof filaDestino.addCardElement === "function") {
                                            filaDestino.addCardElement(card);
                                        }
                                        if (typeof card.placed === "object" && card.placed.length > 0) {
                                            for (let x of card.placed) { await x(card, filaDestino); }
                                        } 
                                    }
                                    await sleep(400);
                                    if (typeof board !== "undefined" && board.updateScores) board.updateScores();
                                    if (typeof game.resize === "function") game.resize();
                                }              
                            }
                        } else {
                            player.deck.addCard(card);
                        } 
                    }
                }         
            }        
        },
        factionAbility: player => {
            game.gameStart.push(async () => {
                player.getAllRows().forEach(r => {
                    let c = new Card("spe_dimensional_door", card_dict["spe_dimensional_door"], player);
                    c.flip(); // Starts the game face down
                    c.noRemove = true; // Stays on the board until the end
                    r.special.addCard(c);
                });
                // Draws an additional card
                player.deck.draw(player.hand);
                player.playedLeaders = [player.leader.key];
                return false;
            });
            game.roundStart.push(async () => {
                // We put all Dimensional Doors face down again
                player.getAllRows().forEach(r => {
                    let door = r.special.findCard(c => c.abilities.includes("door"));
                    if (door && door.faceUp)
                        door.flip();
                });
                // Select a different leader starting from round 2
                if (game.roundCount > 1) {
                    let availableLeaders = Object.keys(card_dict).filter(cid => card_dict[cid].deck === "wild_hunt" && card_dict[cid].row === "leader" && !player.playedLeaders.includes(cid))
                        .map(cid => new Card(cid, card_dict[cid], player));
                    let targetCard = null;
                    if (player.controller instanceof ControllerAI) {
                        let rand = randomInt(availableLeaders.length);
                        targetCard = availableLeaders[rand];
                    } else {
                        await ui.queueCarousel({ cards: availableLeaders }, 1, (c, i) => targetCard = c.cards[i], c => true, true, false, "Select the next leader to start the round with");
                    }
                    if (targetCard) {
                        player.playedLeaders.push(targetCard.key);
                        player.replaceLeader(targetCard);
                    }
                }
                
                return false;
            });
                game.turnEnd.push(async () => {
                if(game.currPlayer === player)
                    await factions["wild_hunt"].factionAbilityAction(player);
            });
        },
        description: "Start the game with an 11-card hand instead of 10. At the start of each round, choose a new Leader card to use its ability.",
        activeAbility: false,
        abilityUses: 0,
        weight: (player) => {
            return 0;
        },
        unavailableSpecials: ["spe_horn","spe_fog","spe_rain","spe_frost"]
    },
	novigrad: {
		name: "Free City of Novigrad",
		factionAbility: player => {
			// Passive ability: After drawing opening hand, may redraw 1 extra card
			// This is handled in initialRedraw function
		},
		activeAbility: false,
		abilityUses: 0,
		description: "After drawing your opening hand, you may redraw 1 extra card."
	},
    		ofir: {
		name: "Ofir",
		factionAbility: async player => {
			// Search deck for weather cards
			const weatherCards = player.deck.findCards(c => c.faction === "weather");
			
			if (weatherCards.length === 0) {
				await ui.notification("ofir", 1200);
				return; // No weather cards in deck
			}
			
			await ui.notification("ofir", 1200);
			
			if (player.controller instanceof ControllerAI) {
				// AI: Choose best weather card based on weight
				let bestCard = null;
				let bestWeight = -1;
				for (let card of weatherCards) {
					const weight = player.controller.weightWeather(card);
					if (weight > bestWeight) {
						bestWeight = weight;
						bestCard = card;
					}
				}
				if (bestCard) {
					await bestCard.autoplay(player.deck);
				}
			} else {
				// Player: Let them choose from weather cards
				player.endTurnAfterAbilityUse = false;
				await ui.queueCarousel(player.deck, 1, async (container, index) => {
					const selectedCard = container.cards[index];
					if (selectedCard && selectedCard.faction === "weather") {
					
						player.endTurnAfterAbilityUse = true;
						
						
						await selectedCard.autoplay(player.deck);
						
						
						if (typeof board !== "undefined" && board.updateScore) {
							board.updateScore();
						}
					} else {
						player.endTurnAfterAbilityUse = true;
					}
				}, c => c.faction === "weather", false, true, "Choose a weather card to play");
			}
		},
		activeAbility: true,
		abilityUses: 1,
		description: "Once per game, you may search your deck for a weather card and play it.",
		weight: (player) => {
			const weatherCards = player.deck.findCards(c => c.faction === "weather");
			if (weatherCards.length === 0) return 0;
			
			let bestWeight = -1;
			for (let card of weatherCards) {
				const weight = player.controller.weightWeather(card);
				if (weight > bestWeight) {
					bestWeight = weight;
				}
			}
			return Math.max(0, bestWeight);
		}, unavailableSpecials: ["spe_scorch", "spe_horn", "spe_frost", "spe_rain", "spe_fog"]
	}
}

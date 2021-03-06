import red from '@material-ui/core/colors/red';
import purple from '@material-ui/core/colors/purple';
import indigo from '@material-ui/core/colors/indigo';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import {List, Map, OrderedMap, Set} from 'immutable';

import Card from './card';

const rawEternalCardData = import('../eternal-cards.json')
  .then(module => module.default);

const FACTIONS_ORDER = List([
  'Fire',
  'Time',
  'Justice',
  'Primal',
  'Shadow',
  'Praxis',
  'Rakano',
  'Combrei',
  'Elysian',
  'Hooru',
  'Argenport',
  'Skycrag',
  'Feln',
  'Stonescar',
  'Xenan',
  'Multifaction',
  'Factionless'
]);

const RARITIES_ORDER = List([
  'Common',
  'Uncommon',
  'Rare',
  'Promo',
  'Legendary',
  'None'
]);

const SETS_ORDER = List([
  'Set 0',
  'The Eternal Throne',
  'Jekk\'s Bounty',
  'Omens of the Past',
  'The Tale of Horus Traver',
  'The Dusk Road',
  'Dead Reckoning',
  'The Fall of Argenport'
]);

const TYPES_ORDER = List([
  'Unit',
  'Attachment',
  'Spell',
  'Power'
]);

const KEYWORDS = List([
  'Aegis',
  'Charge',
  'Deadly',
  'Double Damage',
  'Endurance',
  'Flying',
  'Killer',
  'Lifesteal',
  'Overwhelm',
  'Quickdraw',
  'Reckless',
  'Revenge',
  'Unblockable',
  'Warcry',
  'Ambush',
  'Destiny',
  'Echo',
  'Ally',
  'Empower',
  'Entomb',
  'Fate',
  'Infiltrate',
  'Lifeforce',
  'Mentor',
  'Student',
  'Spark',
  'Summon',
  'Transmute',
  'Ultimate',
  'Bond',
  'Depleted',
  'Invulnerable',
  'Nightfall',
  'Night',
  'Scout',
  'Silence',
  'Steal',
  'Stun',
  'Stunned',
  'Warp',
  'Kill',
  'Inspire',
  'Spellcraft',
  'Berserk',
  'Tribute',
  'Market',
  'Power',
  'Transform'
]);

const SETS = Map()
  .set(0, 'Set 0')
  .set(1, 'The Eternal Throne')
  .set(2, 'Omens of the Past')
  .set(3, 'The Dusk Road')
  .set(4, 'The Fall of Argenport')
  .set(1001, 'Jekk\'s Bounty')
  .set(1002, 'The Tale of Horus Traver')
  .set(1003, 'Dead Reckoning');

const FACTIONS = Map()
  .set(Set(), 'Factionless')
  .set(Set(['F']), 'Fire')
  .set(Set(['T']), 'Time')
  .set(Set(['J']), 'Justice')
  .set(Set(['P']), 'Primal')
  .set(Set(['S']), 'Shadow')
  .set(Set(['J', 'P']), 'Hooru')
  .set(Set(['F', 'P']), 'Skycrag')
  .set(Set(['F', 'T']), 'Praxis')
  .set(Set(['J', 'S']), 'Argenport')
  .set(Set(['F', 'J']), 'Rakano')
  .set(Set(['T', 'J']), 'Combrei')
  .set(Set(['F', 'S']), 'Stonescar')
  .set(Set(['T', 'S']), 'Xenan')
  .set(Set(['P', 'S']), 'Feln')
  .set(Set(['T', 'P']), 'Elysian');

const TYPES = Map({
  'Fast Spell': 'Spell',
  'Power': 'Power',
  'Cursed Relic': 'Attachment',
  'Curse': 'Attachment',
  'Unit': 'Unit',
  'Weapon': 'Attachment',
  'Relic Weapon': 'Attachment',
  'Relic': 'Attachment',
  'Spell': 'Spell'
});

const ETERNAL_GROUPS = [
  'Faction',
  'Cost - Power',
  'Cost - Influence',
  'Attack',
  'Health',
  'Rarity',
  'Type',
  'Card Type',
  'Unit Type',
  'Keyword',
  'Set'
];

const ETERNAL_DEFAULT_SORT_ORDER = OrderedMap({
  'Cost - Power': (a, b) => a - b,
  'Cost - Influence': (a, b) => a.replace(/{|}/g, '').length - b.replace(/{|}/g, '').length,
  'Type': (a, b) => TYPES_ORDER.indexOf(a) - TYPES_ORDER.indexOf(b),
  'Faction': (a, b) => FACTIONS_ORDER.indexOf(a) - FACTIONS_ORDER.indexOf(b),
  'Rarity': (a, b) => RARITIES_ORDER.indexOf(a) - RARITIES_ORDER.indexOf(b),
  'Attack': (a, b) => a - b,
  'Health': (a, b) => a - b,
  'Unit Type': (a, b) => {
    a = (Array.isArray(a) ? a[0] : a) || '';
    b = (Array.isArray(b) ? b[0] : b) || '';
    return a.localeCompare(b);
  },
  'Keyword': (a, b) => {
    a = (Array.isArray(a) ? a[0] : a) || '';
    b = (Array.isArray(b) ? b[0] : b) || '';
    return a.localeCompare(b);
  },
  'Name': (a, b) => a.localeCompare(b),
  'Set': (a, b) => SETS_ORDER.indexOf(a) - SETS_ORDER.indexOf(b),
  'Card Type': (a, b) => a.localeCompare(b)
});

const ETERNAL_PACK_SORT_ORDER = OrderedMap({
  'Rarity': (a, b) => RARITIES_ORDER.indexOf(a) - RARITIES_ORDER.indexOf(b),
  'Faction': (a, b) => FACTIONS_ORDER.indexOf(a) - FACTIONS_ORDER.indexOf(b),
  'Type': (a, b) => TYPES_ORDER.indexOf(a) - TYPES_ORDER.indexOf(b),
  'Cost - Power': (a, b) => a - b,
  'Cost - Influence': (a, b) => a.replace(/{|}/g, '').length - b.replace(/{|}/g, '').length,
  'Attack': (a, b) => a - b,
  'Health': (a, b) => a - b,
  'Name': (a, b) => a.localeCompare(b),
  'Set': (a, b) => SETS_ORDER.indexOf(a) - SETS_ORDER.indexOf(b)
});

const ETERNAL_CARDS = rawEternalCardData
  .then(rawEternalCardData => List(rawEternalCardData)
    .map((card, index) => new Card(index, card['Name'], parseUrl(card['Name']), !card['DeckBuildable'], {
      'Set': parseSet(card['SetNumber']),
      'Set Number': card['SetNumber'],
      'Eternal ID': card['EternalID'],
      'Cost - Power': card['Cost'],
      'Cost - Influence': card['Influence'],
      'Faction': parseFaction(card['Influence']),
      'Attack': card['Attack'],
      'Health': card['Health'],
      'Rarity': card['Rarity'],
      'Type': parseType(card['Type']),
      'Card Type': card['Type'],
      'Unit Type': card['UnitType'] || [],
      'Keyword': parseKeywords(card['CardText'] || ''),
      'Card Text': card['CardText']
    }, ETERNAL_DEFAULT_SORT_ORDER))
    .sort((a, b) => a.compare(b))
  );

export {ETERNAL_GROUPS, ETERNAL_DEFAULT_SORT_ORDER, ETERNAL_PACK_SORT_ORDER, ETERNAL_CARDS};

export function generateEternalStats(cards) {
  const minCurve = 0;
  const curveGroups = cards
    .filterNot(card => card.getValue('Type') == 'Power')
    .groupBy(card => card.getValue('Cost - Power'));
  const maxCurve = curveGroups.keySeq().max();

  const colourGroups = cards
    .filterNot(card => card.getValue('Type') == 'Power')
    .map(card => Set(card.getValue('Cost - Influence').replace(/{|}/g, '').split('')))
    .flatten()
    .groupBy(colour => colour);
  const colourColours = Map({
    'F': red['700'],
    'S': purple['700'],
    'P': indigo['700'],
    'J': green['700'],
    'T': yellow['700']
  });

  const typeGroups = cards.groupBy(card => card.getValue('Type'));

  return [{
    title: 'Power Curve',
    labels: List()
      .set(maxCurve + 1, 0)
      .map((_, index) => `${index}`)
      .toArray(),
    values: List()
      .set(maxCurve + 1, 0)
      .map((_, index) => curveGroups.get(index, List()).size)
      .toArray()
  }, {
    title: 'By Colour',
    labels: colourGroups.keySeq().toArray(),
    values: colourGroups.map(colours => colours.size).toArray(),
    colours: colourGroups.map(colours => colourColours.get(colours.first())).toArray()
  }, {
    title: 'By Type',
    labels: typeGroups.keySeq().toArray(),
    values: typeGroups.map(cards => cards.size).toArray()
  }]
}

function parseUrl(name) {
  return `static/eternal/${name}.png`;
}

function parseSet(setNumber) {
  return SETS.get(setNumber);
}

function parseFaction(influence) {
  const colours = Set(influence.replace(/{|}/g, '').split(''));
  return FACTIONS.get(colours, 'Multifaction');
}

function parseType(cardType) {
  return TYPES.get(cardType);
}

function parseKeywords(cardText) {
  return KEYWORDS
    .filter(keyword => new RegExp(`\\b${keyword}\\b`, 'i').test(cardText))
    .toArray();
}


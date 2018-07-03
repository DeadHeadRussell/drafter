import withStyles from '@material-ui/core/styles/withStyles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import {List, Map} from 'immutable';

import CardGroup from '~/components/cardGroup';

export default withStyles(
  theme => ({
    root: {
      display: 'flex',
      flexFlow: 'row wrap',
      marginBottom: theme.spacing.unit * 3,
    },
    header: {
      flex: '0 0 100%',
      margin: theme.spacing.unit
    },
    formControl: {
      minWidth: 120,
      margin: theme.spacing.unit
    },
    content: {
      flex: '0 0 100%',
      margin: theme.spacing.unit,
      alignItems: 'flex-start'
    },
    rows: {
      display: 'flex',
      flexFlow: 'column nowrap'
    },
    columns: {
      display: 'flex',
      flexFlow: 'row wrap'
    }
  }),
  {withTheme: true}
)(class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.createInitialState(props);
  }

  createInitialState(props) {
    return {
      grouping: props.defaultGrouping || props.groupings[0],
      view: props.defaultView || 'rows',
      compact: false
    };
  }

  getCardGroups() {
    const {cards, sortOrder} = this.props;
    const {grouping} = this.state;

    return cards
      .groupBy(card => card.getValue(grouping))
      .reduce(
        (groups, cards, column) => {
          if (Array.isArray(column)) {
            if (column.length > 0) {
              return column
                .reduce(
                  (groups, column) => groups
                    .update(column, List(), c => c.concat(cards)),
                  groups
                );
            } else {
              return groups.update('', List(), c => c.concat(cards));
            }
          } else {
            return groups.update(column, List(), c => c.concat(cards));
          }
        },
        Map()
      )
      .map(cards => cards.sort((a, b) => a.compare(b, grouping)))
      .sortBy(
        (_, groupName) => groupName,
        (a, b) => sortOrder.get(grouping)(a, b)
      );
  }

  updateGrouping = event => {
    this.setState({grouping: event.target.value});
  }

  updateView = event => {
    this.setState({view: event.target.value});
  }

  updateCompact = event => {
    this.setState({compact: !!event.target.checked});
  }

  render() {
    const {classes, name, cards, groupings, cardActions, onCardClick} = this.props;
    const {grouping, view, compact} = this.state;

    const cardGroupElems = this.getCardGroups()
      .map((cards, groupName) => (
        <CardGroup key={groupName} name={groupName} cards={cards} view={view} compact={compact} cardActions={cardActions} onCardClick={onCardClick} />
      ))
      .toList();

    return (
      <div className={classes.root}>
        <Typography variant='headline' className={classes.header}>{name} - ({cards.size})</Typography>
        <FormControl className={classes.formControl}>
          <FormLabel htmlFor='grouping-sort'>Grouping / Sort</FormLabel>
          <Select
            value={grouping}
            onChange={this.updateGrouping}
            inputProps={{
              name: 'grouping',
              id: 'grouping-sort'
            }}
          >
            {[(<MenuItem value='None'>None</MenuItem>)]
              .concat(groupings
                .map(grouping => (
                  <MenuItem value={grouping}>{grouping}</MenuItem>
                ))
              )
            }
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <FormLabel htmlFor='view'>View</FormLabel>
          <Select
            value={view}
            onChange={this.updateView}
            inputProps={{
              name: 'view',
              id: 'view'
            }}
          >
            <MenuItem value='rows'>Rows</MenuItem>
            <MenuItem value='columns'>Columns</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          className={classes.formControl}
          control={
            <Checkbox
              checked={compact}
              onChange={this.updateCompact}
              value='compact'
            />
          }
          label='Compact'
        />

        {cardGroupElems.isEmpty()
          ? <Typography variant='body1' className={classes.content}>This board is empty</Typography>
          : <div className={classNames(classes.content, classes[view])}>{cardGroupElems}</div>
        }
      </div>
    );
  }
});


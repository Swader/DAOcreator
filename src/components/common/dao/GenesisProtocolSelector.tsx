import * as React from "react";
import { observable } from "mobx";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Select,
  FilledInput,
  FormControl,
  InputLabel,
  Grid,
  Fab,
  Dialog,
  AppBar,
  Toolbar,
  Slide,
  IconButton
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import EditIcon from "@material-ui/icons/Settings";
import CloseIcon from "@material-ui/icons/Close";
import {
  GenesisProtocolForm,
  CreateGenesisProtocolForm
} from "../../../lib/forms";
import { GenesisProtocol } from "../../../lib/dependency/arc";

interface Props extends WithStyles<typeof styles> {
  onSelect: (genesisProtocol: GenesisProtocolForm) => void;
}

export enum ProtocolPreset {
  easy = "Easy",
  normal = "Normal",
  critical = "Critical",
  custom = "Custom"
}

interface State {
  protocol: ProtocolPreset;
  editing: boolean;
}

class GenesisProtocolSelector extends React.Component<Props, State> {
  @observable
  form = CreateGenesisProtocolForm();

  constructor(props: Props) {
    super(props);
    this.state = {
      protocol: ProtocolPreset.normal,
      editing: false
    };
  }

  render() {
    const { classes, onSelect } = this.props;
    const { protocol, editing } = this.state;
    const form = this.form;

    const onChange = (event: React.ChangeEvent<{ value: any }>) => {
      const preset = event.target.value as ProtocolPreset;

      // update the backing form to a preset if needed
      switch (preset) {
        case ProtocolPreset.easy:
          form.fromState(GenesisProtocol.EasyConfig);
          break;
        case ProtocolPreset.normal:
          form.fromState(GenesisProtocol.NormalConfig);
          break;
        case ProtocolPreset.critical:
          form.fromState(GenesisProtocol.CriticalConfig);
          break;
      }

      // let the parent know something's been chosen
      onSelect(form);

      this.setState({
        ...this.state,
        protocol: preset
      });
    };

    const onEdit = () => {
      this.setState({
        ...this.state,
        editing: true,
        protocol: ProtocolPreset.custom
      });
    };

    const onClose = () => {
      this.setState({
        ...this.state,
        editing: false
      });
    };

    const Transition = React.forwardRef<unknown, TransitionProps>(
      function Transition(props, ref) {
        // @ts-ignore: ref exists
        return <Slide direction="up" ref={ref} {...props} />;
      }
    );

    // TODO: <GenesisProtocolAnalytics protocol{form.toState()} />
    return (
      <div>
        <FormControl variant="filled" fullWidth>
          <InputLabel htmlFor="protocol">Genesis Protocol</InputLabel>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={10}>
              <Select
                native
                fullWidth
                value={protocol}
                onChange={onChange}
                input={<FilledInput name="protocol" id="protocol" />}
              >
                <option value={ProtocolPreset.easy}>
                  {ProtocolPreset.easy}
                </option>
                <option value={ProtocolPreset.normal}>
                  {ProtocolPreset.normal}
                </option>
                <option value={ProtocolPreset.critical}>
                  {ProtocolPreset.critical}
                </option>
                <option value={ProtocolPreset.custom}>
                  {ProtocolPreset.custom}
                </option>
              </Select>
            </Grid>
            <Grid item>
              <Fab size="small" color="secondary" onClick={onEdit}>
                <EditIcon />
              </Fab>
            </Grid>
          </Grid>
        </FormControl>
        <Dialog fullScreen open={editing} TransitionComponent={Transition}>
          <AppBar>
            <Toolbar>
              <Grid container justify="flex-end" alignItems="flex-start">
                <Grid item>
                  <IconButton color="inherit" onClick={onClose}>
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Dialog>
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({});

export default withStyles(styles)(GenesisProtocolSelector);

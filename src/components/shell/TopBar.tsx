import * as React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import {
  withStyles,
  Theme,
  WithStyles,
  createStyles,
  AppBar,
  Toolbar,
  CardMedia,
  Grid,
  Button,
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
  MenuList,
  MenuItem
} from "@material-ui/core";
import "./NeonGlow.css";

// eslint-disable-next-line
interface Props extends WithStyles<typeof styles> {
  gotoDapp: () => void;
}

const TopBar: React.SFC<Props> = ({ classes, gotoDapp }) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <AppBar position={"static"} className={classes.appBar}>
      <Toolbar>
        <Grid container justify={"center"} alignItems={"center"}>
          <div className={classes.text}>{"{"}</div>
          <div>
            <Button
              ref={anchorRef}
              aria-controls="menu-list-grow"
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <CardMedia image={"/icons/dOrg.svg"} className={classes.image} />
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom"
                  }}
                >
                  <Paper id="menu-list-grow" className={classes.menu}>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList>
                        <MenuItem
                          onClick={event => {
                            gotoDapp();
                            handleClose(event);
                          }}
                          className={classes.menuItem}
                        >
                          Create a DAO
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
          <div className={classes.text}>{"}"}</div>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      background: "rgba(2, 46, 46, 0.2)",
      pointerEvents: "all",
      // bring forward (infront of background)
      position: "relative"
    },
    menu: {
      background: "rgba(2, 46, 46, 0.8)"
    },
    menuItem: {
      color: "#4bd2c6"
    },
    image: {
      height: "50px",
      width: "103px",
      marginTop: "5px"
    },
    text: {
      pointerEvents: "none",
      fontSize: "50px",
      color: "#4bd2c6",
      marginRight: "20px",
      marginLeft: "20px",
      "-webkit-animation": "neon 1.5s ease-in-out infinite alternate",
      "-moz-animation": "neon 1.5s ease-in-out infinite alternate",
      animation: "neon 1.5s ease-in-out infinite alternate"
    }
  });

const componentWithStyles = withStyles(styles)(TopBar);

// STATE
const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    gotoDapp: () => {
      dispatch(push("/dapp"));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(componentWithStyles);

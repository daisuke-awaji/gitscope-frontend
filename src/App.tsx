import React from "react";
import Navigator from "./components/Navigator";
import {
  createStyles,
  ThemeProvider,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import { Hidden, CssBaseline } from "@material-ui/core";
import theme from "./theme";
import { Copyright } from "@material-ui/icons";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { links } from "./links";
import { GitHubAuthCallback } from "./components/GitHubAuthCallback";

const drawerWidth = 256;

const styles = createStyles({
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  main: {
    flex: 1,
    padding: theme.spacing(2),
    background: "#eaeff1",
  },
  footer: {
    padding: theme.spacing(2),
    background: "#eaeff1",
  },
});

export interface AppProps extends WithStyles<typeof styles> {}

function App(props: AppProps) {
  const { classes } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    console.log(links);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />

          <nav className={classes.drawer}>
            <Hidden smUp implementation="js">
              <Navigator
                PaperProps={{ style: { width: drawerWidth } }}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
              />
            </Hidden>
            <Hidden xsDown implementation="css">
              <Navigator PaperProps={{ style: { width: drawerWidth } }} />
            </Hidden>
          </nav>
          <div className={classes.app}>
            <Header onDrawerToggle={handleDrawerToggle} />

            <Switch>
              <main className={classes.main}>
                {links.map((link) =>
                  link.children.map((child) => {
                    return (
                      <Route exact path={child.to} key={child.to}>
                        {child.component}
                      </Route>
                    );
                  })
                )}
                <Route exact path="/auth/github/callback">
                  <GitHubAuthCallback />
                </Route>
              </main>
            </Switch>

            <footer className={classes.footer}>
              <Copyright />
            </footer>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default withStyles(styles)(App);

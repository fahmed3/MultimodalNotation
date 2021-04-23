const drawerWidth = 240;

const styles = (theme) => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  backgroundColor: theme.palette.background.paper,
  root: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),
    borderRadius: "8px",
    marginTop: "2.6%",
    display: "flex",
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  form: {
    margin: "70px",
  },
  grid: {
    // maxWidth: "33.33%",
    marginLeft: theme.spacing(0.25),
    padding: theme.spacing(2),
    // position: "absolute",
  },
  formControl: {
    margin: theme.spacing(1),
    top: -16,
    minWidth: 120,
  },
  selectInstrument: {},
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  textArea: {
    fontFamily: theme.typography.fontFamily,
    lineHeight: "18.5px",
    fontSize: "14px",
  },
  shift: { marginLeft: "360px" },
  renderButton: { marginTop: "6px" },
  braille: { marginTop: "2%" },
});

export default styles;

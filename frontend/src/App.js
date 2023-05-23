import "./App.css";

function App() {
  return (
    <div className="App" style={{ padding: "10px" }}>
      <header
        className="App-header"
        style={{
          background: "#eeeeee",

          border: "1px solid black",
        }}
      >
        <div id="navbar">Navbar</div>

        <div id="darkModeButton">dark | light mode</div>

        <div id="tempOptionsButton">C | F</div>

        <div id="searchBar">Search bar & Order options & filters</div>
        <div id="currentStatus">Weather now-today</div>

        <div id="cityList">City List</div>
        <div id="fullDetails">all detials</div>
      </header>
    </div>
  );
}

export default App;

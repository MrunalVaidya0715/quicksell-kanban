import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Kanban from "./containers/Content/Kanban";
import { UserViewStateContext } from "./context/UserViewStateContext";

function App() {
  const initGroupBy = localStorage.getItem("userViewState")?.groupBy || "status";
  const initOrderBy = localStorage.getItem("userViewState")?.orderBy || "priority";

  const [userViewState, setUserViewState] = useState({
    groupBy: initGroupBy,
    orderBy: initOrderBy,
  });

  const updateUserViewState = (newGroupBy, newOrderBy) => {
    setUserViewState({ groupBy: newGroupBy, orderBy: newOrderBy });
    localStorage.setItem("userViewState",JSON.stringify({ groupBy: newGroupBy, orderBy: newOrderBy }));
  };

  useEffect(() => {
    const savedUserViewState = localStorage.getItem("userViewState");
    if (savedUserViewState) {
      const getUserViewState = JSON.parse(savedUserViewState);
      setUserViewState(getUserViewState);
    }
  }, []);
  return (
    <UserViewStateContext.Provider value={{userViewState, updateUserViewState}}>
      <div className="App">
        <Navbar />
        <Kanban />
      </div>
    </UserViewStateContext.Provider>
  );
}

export default App;

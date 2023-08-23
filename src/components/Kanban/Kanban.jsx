import React, { useState, useEffect } from "react";
import "./Kanban.css";
function KanbanBoard() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [displayMode, setDisplayMode] = useState("priority");
  const [groupingMode, setGroupingMode] = useState("priority");
  const [orderingMode, setOrderingMode] = useState("none");
  const [groupedData, setGroupedData] = useState({});
  const statuses = ["Todo", "In progress", "Backlog", "Done"];
  const priorityLabels = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No Priority",
  };
  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    const savedViewState = localStorage.getItem("kanbanViewState");
    if (savedViewState) {
      const viewState = JSON.parse(savedViewState);
      setDisplayMode(viewState.displayMode);
      setGroupingMode(viewState.groupingMode);
      setOrderingMode(viewState.orderingMode);
    }
    const sorted = sortedTickets();
    groupAndSortTickets(sorted);
  }, []);
  useEffect(() => {
    const sorted = sortedTickets();
    groupAndSortTickets(sorted);
    const viewState = {
      displayMode,
      groupingMode,
      orderingMode,
    };
    localStorage.setItem("kanbanViewState", JSON.stringify(viewState));
  }, [tickets, displayMode, groupingMode, orderingMode]);
  const sortedTickets = () => {
    let sorted = [...tickets];
    if (orderingMode === "priority") {
      sorted = sorted.sort((a, b) => b.priority - a.priority);
    }
    if (orderingMode === "title") {
      sorted = sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sorted;
  };
  const groupAndSortTickets = (sortedTickets) => {
    let groupedData = {};
    if (displayMode === "priority") {
      if (groupingMode === "priority") {
        for (let i = 0; i <= 4; i++) {
          groupedData[i] = sortedTickets.filter(
            (ticket) => ticket.priority === i,
          );
        }
      } else if (groupingMode === "user") {
        users.forEach((user) => {
          groupedData[user.id] = sortedTickets.filter(
            (ticket) => ticket.userId === user.id,
          );
        });
      }
    } else if (displayMode === "status") {
      statuses.forEach((status) => {
        groupedData[status] = sortedTickets.filter(
          (ticket) => ticket.status === status,
        );
      });
    }
    setGroupedData(groupedData);
  };

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}

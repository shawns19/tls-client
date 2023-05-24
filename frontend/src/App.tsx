import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { HomePage } from "./pages/Home";
import { TasksV2 } from "./pages/TasksV2";
const routes = [
  {
    path: "/",
    main: () => <HomePage />,
  },
  {
    path: "/tasksv2",
    main: () => <TasksV2 />,
  },
];
export const App = () => {
  return (
    <Router>
      <Sidebar />
      <Routes>
        {routes.map((path) => (
          <Route path={path.path} element={path.main()}></Route>
        ))}
      </Routes>
    </Router>
  );
};

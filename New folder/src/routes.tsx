import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/login";
import AlHakawatiPage from "./pages/alHakawati";
import ResultPage from "./pages/result";
import CameraInputPage from "./pages/cameraInput";
import FileInputPage from "./pages/fileInput";
const Routes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<AlHakawatiPage />}>
          <Route path="camera-input" element={<CameraInputPage />} />
          <Route path="file-input" element={<FileInputPage />} />
        </Route>
        <Route path="/result/:name" element={<ResultPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Routes;

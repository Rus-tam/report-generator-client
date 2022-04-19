import FileUpload from "./components/FileUpload";

const App = () => {
  return (
    <div className="container mt-4">
      <h1 className="display-4 text-center mb-4">Добро пожаловать в генератор отчетов</h1>

      <FileUpload />
    </div>
  );
};

export default App;

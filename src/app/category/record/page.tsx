import TodoComponent from "@/app/components/todo/TodoList";
import Footer from "@/app/components/layout/Footer";

function RecordPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <h1 className="text-4xl ">記録</h1>
        <TodoComponent />
      </div>
      <Footer />
    </div>
  );
}
export default RecordPage;

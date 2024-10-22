import OrderForm from "@/components/OrderForm";

export default function Home() {
  return (
    <div className="m-10 grid place-content-center">
      <h1 className="text-4xl font-bold">Next.js Template</h1>
      <OrderForm />
    </div>
  );
}

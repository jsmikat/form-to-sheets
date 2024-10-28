import OrderForm from "@/components/OrderForm";
import Cover from "@/components/cover";
import { getOptions } from "@/lib/actions";

export default async function Home() {
  const productOptions = await getOptions();

  return (
    <div className="m-10 grid place-content-center">
      <Cover link={productOptions.data.coverLink}/>

      {productOptions ? (
        <OrderForm productOptions={productOptions.data} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export const dynamic = "force-dynamic";

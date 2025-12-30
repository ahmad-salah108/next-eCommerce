import CardProduct from "@/components/CardProduct";

function MightLike() {
  const SLIDES = Array.from({ length: 4 }).map((_, i) => (
    <CardProduct
      key={i}
      className={`
        mx-auto sm:mx-0
      ${
        i === 1
          ? "hidden sm:block"
          : i === 2
          ? "hidden lg:block"
          : i === 3
          ? "hidden 2xl:block"
          : ""
      }               
    `}
    />
  ));
  return (
    <section className="pt-24 lg:pb-8">
      <h2 className="font-black text-4xl md:text-5xl text-center mb-12 uppercase">
        You might also like
      </h2>
      <div className="flex justify-between items-center">{SLIDES}</div>
    </section>
  );
}

export default MightLike;

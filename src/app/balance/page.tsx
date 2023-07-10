import BalanceCard from "@/components/Balance/BalanceCard";

const Balance = () => {
  return (
    <section className="container py-6">
      <h1 className="mb-4 text-lg font-bold">My Balance</h1>
      <div className="max-w-[360px]">
        <BalanceCard showButton />
      </div>
    </section>
  );
};

export default Balance;

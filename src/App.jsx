import CountdownTimer from "@/components/CountdownTimer";
import Welcome from "@/components/Welcome";
import RandomDate from "@/utils/RandomDate";

const App = () => {
  const time = RandomDate();
  return (
    <main>
      <div class="w-screen h-screen md:w-auto md:h-auto backdrop-blur-md shadow bg-white/30 dark:bg-slate-800 text-sky-800 dark:text-indigo-600">
        <Welcome message="This is a countdown timer using solidjs but running on userscript." />
        <CountdownTimer date={time} />
      </div>
    </main>
  );
};

export default App;

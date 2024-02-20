import { onCleanup, createSignal, createEffect } from "solid-js";
const [count, setCount] = createSignal(0);

const Increment = (props) => {
  const [increase, setIncrease] = createSignal(props?.value ?? 1);
  const increment = () => {
    setCount(count() + increase());
  };
  createEffect(() => {
    if (increase() < 1) {
      setIncrease(1);
    }
  });
  const handleInput = (e) => setIncrease(e.target.value);
  return (
    <div class="flex flex-row">
      <h1>Increment to countdown timer</h1>
      <input type="number" value={increase} onInput={handleInput} />
      <button
        class="button ropx-4 py-2 font-semibold text-sm bg-white text-slate-700 border border-slate-300 rounded-md shadow-sm ring-2 ring-offset-2 ring-offset-slate-50 ring-blue-500 dark:ring-offset-slate-900 dark:bg-slate-700 dark:text-slate-200 dark:border-transparent"
        onClick={increment}
      >
        +
      </button>
    </div>
  );
};

const Decrement = (props) => {
  const [decrease, setDecrease] = createSignal(props?.value ?? 1);
  const decrement = () => {
    setCount(count() - decrease());
  };
  createEffect(() => {
    if (decrease() < 1) {
      setDecrease(1);
    }
  });
  const handleInput = (e) => setDecrease(e.target.value);
  return (
    <div class="flex flex-row">
      <h1>Decrement to countdown timer</h1>
      <input type="number" value={decrease} onInput={handleInput} />
      <button
        class="button ropx-4 py-2 font-semibold text-sm bg-white text-slate-700 border border-slate-300 rounded-md shadow-sm ring-2 ring-offset-2 ring-offset-slate-50 ring-blue-500 dark:ring-offset-slate-900 dark:bg-slate-700 dark:text-slate-200 dark:border-transparent"
        onClick={decrement}
      >
        -
      </button>
    </div>
  );
};

const CountdownTimer = (props) => {
  let target = props.date;
  if (
    (typeof target === "string" &&
      new Date(target).getTime() > new Date().getTime()) ||
    (typeof target === "number" && target > new Date().getTime())
  ) {
    target = new Date(target);
  } else if (
    typeof target === "object" &&
    target instanceof Date &&
    target.getTime() > new Date().getTime()
  ) {
    target = target;
  } else {
    return (
      <span class="text-4xl text-red-700 text-center py-20">Invalid date</span>
    );
  }

  setCount((target.getTime() - new Date().getTime()) / 1000);
  const [countToText, setCountToText] = createSignal("");

  const timer = setInterval(() => {
    setCount(count() - 1);
  }, 1000);

  const clock = setInterval(() => {
    let seconds = Math.floor(count()) % 60;
    let minutes = Math.floor(count() / 60) % 60;
    let hours = Math.floor(count() / 3600) % 24;
    let days = Math.floor(count() / 86400) % 7;
    let weeks = Math.floor(count() / 604800) % 4;
    let months = Math.floor(count() / 2628000) % 12;
    let years = Math.floor(count() / 31536000);
    let addText = (text) => {
      setCountToText(`${countToText()} ${text}`);
    };
    let addHours = () => {
      addText(`${hours} hour${hours > 1 ? "s" : ""}`);
    };
    let addMinutes = () => {
      addText(`${minutes} minute${minutes > 1 ? "s" : ""}`);
    };
    let addSeconds = () => {
      addText(`${seconds} second${seconds > 1 ? "s" : ""}`);
    };
    let addDays = () => {
      addText(`${days} day${days > 1 ? "s" : ""}`);
    };
    let addWeeks = () => {
      addText(`${weeks} week${weeks > 1 ? "s" : ""}`);
    };
    let addMonths = () => {
      addText(`${months} month${months > 1 ? "s" : ""}`);
    };
    let addYears = () => {
      addText(`${years} year${years > 1 ? "s" : ""}`);
    };
    setCountToText("");
    years > 0 && addYears();
    months > 0 && addMonths();
    weeks > 0 && addWeeks();
    days > 0 && addDays();
    hours > 0 && addHours();
    minutes > 0 && addMinutes();
    seconds > 0 && addSeconds();
    count() <= 0 && setCountToText("Time's up!") && clearInterval(clock);
  }, 1000);

  onCleanup(() => clearInterval(timer));
  onCleanup(() => clearInterval(clock));

  return (
    <div class="text-center">
      <Increment value={1} />
      <Decrement value={1} />
      <span class="text-4xl text-green-700 text-center">{countToText}</span>
    </div>
  );
};

export default CountdownTimer;

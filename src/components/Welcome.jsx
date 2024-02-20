const Welcome = (props) => {
  let message = (props.message === undefined) ? "Welcome to SolidJS" : props.message;
  return (
    <div>
      <h1 class="text-4xl text-center py-20">{message}</h1>
    </div>
  );
};

export default Welcome;

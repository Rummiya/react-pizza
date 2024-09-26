const ErrorStatus = () => {
  return (
    <div className="error-status">
      <h2>Произошла ошибка :(</h2>
      <p>Не удалось загрузить пиццы, повторите попытку позже</p>
      <img width={500} src="/img/empty-cart.png" alt="error" />
    </div>
  );
};

export default ErrorStatus;

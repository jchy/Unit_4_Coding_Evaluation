const Form = () => {
  return (
    <>
      <form>
        <input placeholder="...Enter your name" type="text" />
        <input placeholder="Enter Phone Number" type="number" />
        <select>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
        </select>
      </form>
    </>
  );
};
export default Form;

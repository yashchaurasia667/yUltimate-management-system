const page = () => {
  return (
    <form>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" />
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input type="text" />
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input type="number" />
      </div>
      <div>
        <label htmlFor="city">city</label>
        <input type="text" />
      </div>
      <div>
        <label htmlFor="state">state</label>
        <input type="text" />
      </div>
      <div>
        <label htmlFor="type">Type</label>
        <label htmlFor="type">coach</label>
        <input type="radio" value={"coach"} name="type" />
        <label htmlFor="type">student</label>
        <input type="radio" value={"student"} name="type" />
      </div>
      <button>Apply for approval</button>
    </form>
  );
};

export default page;

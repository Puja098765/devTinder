const UserCard =({ user })=> {
    const { firstName, lastName, photoUrl, age, gender, about } = user;
    return (

<div className="card bg-base-300 h-[520px] w-96 shadow-sm">
  <figure className="h-90 overflow-hidden">
    <img
      src={user.photoUrl}
      alt="photo"
      className="h-full w-full object-cover"
      />
  </figure>
  <div className="card-body flex flex-col justify-between overflow-hidden">
    <h2 className="card-title">{firstName + " " + lastName }</h2>
   {age && gender && <p>{age + ", " + gender }</p> }
    <p className=" max-h-24">{about}</p>
    {/* <div className="card-actions justify-center my-4">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>
    </div> */}
  </div>
</div> 
);
   

};
export default UserCard;
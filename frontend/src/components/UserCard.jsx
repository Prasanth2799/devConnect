const UserCard = ({userData}) => {
  const {firstName, lastName, photoUrl, age, skills, gender} = userData;
  return (
    <>
    <div className="card w-72 h-96 shadow-sm bg-base-300 p-2 items-center">
  <figure>
    <img
      src={photoUrl}
      alt="feed-user-photo"
      className="w-72"
      />
  </figure>
  <div className="card-body">
    {firstName && lastName ?<h2 className="card-title">{firstName+" "+lastName}</h2> : <h2 className="card-title">{firstName}</h2>}
     {age && gender && <p>{age + " "+gender}</p> || gender && <p>{gender}</p> || age && <p>{age}</p>}
    <div className="card-actions justify-between">
      <button className="btn btn-secondary">Ignored</button>
      <button className="btn btn-primary">Interested</button>
    </div>
  </div>
</div>
    </>
    
  )
}

export default UserCard
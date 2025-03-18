

function AboutItem({ icon, title, description }) {
  return (
    <div className="row">
      <div className="col-3">{icon}</div>
      <div className="col-9 d-flex flex-column">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default AboutItem;

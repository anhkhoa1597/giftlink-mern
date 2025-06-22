import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="container">
      <div className="content">
        <h1>GiftLink</h1>
        <h2>Share Gifts and Joy!</h2>
        <p className="lead">
          "Sharing is the essence of community. It is through giving that we
          enrich and perpetuate both our lives and the lives of others."
        </p>
        <a href="/main" className="btn btn-primary">
          Get Started
        </a>
      </div>
    </div>
  );
};

export default HomePage;

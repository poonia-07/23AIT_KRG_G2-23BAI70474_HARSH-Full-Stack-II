
const Header = ({title}) => {
  return (
    <header style={{
        backgroundColor : "#4CAF50",
        color : "white",
        padding : "1rem",
        textAlign : "center"
    }}>
        <h1>{title}</h1>
    </header>
  );
}
export default Header;
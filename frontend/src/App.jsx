import ListItemForm from './components/ListItemForm';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm'
import ItemDetail from './components/ItemDetail';

const App=()=> {
  const item = {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYqoKTu_o3Zns2yExbst2Co84Gpc2Q1RJbA&s',
    title: 'Retro Graphic Tee',
    user: 'Jay Mehta',
    category: 'Men’s Clothing',
    description: 'Vintage-inspired graphic t-shirt made from soft, breathable cotton. Lightly used and well-maintained.',
    points: 30,
    listingType: 'Swap',
  }
  
  
  return(
    <>
    <ItemDetail item={item}/>
    </>
  )
}
export default App
import { useEffect, useState } from "react";
import { fetchData } from "../api";
import OrderCard from "../components/OrderCard";
import OrdersSkeleton from "../components/OrdersSkeleton";
import l_shape from "/images/picto/l_shape.svg";
import o_shape from "/images/picto/o_shape.svg";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const data = await fetchData("/orders");
                setOrders(data.orders);
                setUser(data.user);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);    return (
        <div className="bg-loomibeige min-h-screen relative px-8 py-8 font-montserrat overflow-hidden">
          {/* SVG l_shape en haut à droite */}
          <img 
            src={l_shape} 
            alt="Forme décorative haut" 
            className="absolute -right-10 top-[2vw] z-0 pointer-events-none w-[30vw] h-[30vw] max-w-[450px] max-h-[450px]"
            style={{ transform: "rotate(-35deg)" }}
          />
    
          {/* SVG o_shape en bas à droite */}
          <img 
            src={o_shape} 
            alt="Forme décorative bas" 
            className="absolute -right-12 top-[58vw] md:top-[480px] z-0 pointer-events-none w-[22vw] h-[22vw] max-w-[320px] max-h-[320px] overflow-hidden"
            style={{ transform: "rotate(-90deg)" }}
          />
    
          {/* Titre */}
          <h1 className="relative z-10 mb-8">Mes commandes</h1>{/* Liste de commandes */}
          {loading ? (
            <OrdersSkeleton />
          ) : (
            <div className="flex flex-col gap-10 relative z-10 w-[85%]">
              {orders.length === 0 ? (
                  <div className="text-center text-gray-500">Aucune commande trouvée.</div>
              ) : (
                  orders.map((order) => (
                      <OrderCard key={order.id} order={order} user={user} />
                  ))
              )}
            </div>
          )}
        </div>
      );
}
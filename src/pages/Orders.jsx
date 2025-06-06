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
    }, []);    
      return (
        <div className="bg-loomibeige min-h-screen relative px-4 sm:!px-6 md:!px-8 py-4 sm:!py-6 md:!py-8 font-montserrat overflow-hidden">
          {/* SVG l_shape en haut à droite */}
          <img 
            src={l_shape} 
            alt="Forme décorative haut" 
            className="absolute -right-6 sm:!-right-8 md:!-right-10 top-[2vw] z-0 pointer-events-none w-[25vw] h-[25vw] sm:!w-[28vw] sm:!h-[28vw] md:!w-[30vw] md:!h-[30vw] max-w-[300px] max-h-[300px] sm:!max-w-[380px] sm:!max-h-[380px] md:!max-w-[450px] md:!max-h-[450px]"
            style={{ transform: "rotate(-35deg)" }}
          />
    
          {/* SVG o_shape en bas à droite */}
          <img 
            src={o_shape} 
            alt="Forme décorative bas" 
            className="absolute -right-8 sm:!-right-10 md:!-right-12 top-[65vw] sm:!top-[60vw] md:!top-[58vw] lg:!top-[480px] z-0 pointer-events-none w-[18vw] h-[18vw] sm:!w-[20vw] sm:!h-[20vw] md:!w-[22vw] md:!h-[22vw] max-w-[250px] max-h-[250px] sm:!max-w-[280px] sm:!max-h-[280px] md:!max-w-[320px] md:!max-h-[320px] overflow-hidden"
            style={{ transform: "rotate(-90deg)" }}
          />
    
          {/* Titre */}
          <h1 className="relative z-10 mb-6 sm:!mb-7 md:!mb-8 !text-xl sm:!text-2xl md:!text-3xl lg:!text-4xl">Mes commandes</h1>          {/* Liste de commandes */}
          {loading ? (
            <OrdersSkeleton />
          ) : (
            <div className="flex flex-col gap-6 sm:!gap-8 md:!gap-10 relative z-10 w-full sm:!w-[95%] md:!w-[90%] lg:!w-[85%]">
              {orders.length === 0 ? (
                  <div className="text-center text-gray-500 !text-sm sm:!text-base">Aucune commande trouvée.</div>
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
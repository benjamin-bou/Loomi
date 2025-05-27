import { useEffect, useState } from "react";
import { fetchData } from "../api";
import OrderCard from "../components/OrderCard";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState({});
    useEffect(() => {
        const fetchOrders = async () => {
            const data = await fetchData("/orders");
            console.log(data);
            setOrders(data.orders);
            setUser(data.user);
        };
        fetchOrders();
    }, []);

    return (
        <div className="bg-loomibeige min-h-screen relative px-8 py-8 font-montserrat overflow-hidden">
          {/* Forme blob en haut à droite */}
          <div
            className="absolute -right-10 top-[2vw] z-0 pointer-events-none bg-[#d63d87] w-[30vw] h-[30vw] max-w-[450px] max-h-[450px]"
            style={{
              borderRadius: "52% 48% 41% 59% / 50% 35% 65% 50%"
            }}
          />
    
          {/* Forme blob en bas à droite */}
          <div
            className="absolute -right-12 top-[58vw] md:top-[480px] z-0 pointer-events-none bg-[#d63d87] w-[22vw] h-[22vw] max-w-[320px] max-h-[320px] overflow-hidden"
            style={{
              borderRadius: "60% 40% 39% 61% / 62% 47% 53% 38%"
            }}
          />
    
          {/* Titre */}
          <h1 className="relative z-10 mb-8">Mes commandes</h1>
    
          {/* Liste de commandes */}
          <div className="flex flex-col gap-10 relative z-10 w-[85%]">
            {orders.length === 0 ? (
                <div className="text-center text-gray-500">Aucune commande trouvée.</div>
            ) : (
                orders.map((order) => (
                    <OrderCard key={order.id} order={order} user={user} />
                ))
            )}
          </div>
        </div>
      );
}
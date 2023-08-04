import { useGlobalContext } from "../../../shared/hooks/useGlobalContext"

export const Product = () => {
    const {user} = useGlobalContext(); 
    
    return (
        <div>Product {user?.name}</div>
    )
}
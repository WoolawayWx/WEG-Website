import { supabase } from "@/supabase";


async function LogOut() {
    const {error} = await supabase.auth.signOut()
    if(error) {
        console.log(error)
    }
}

export {
    LogOut
}
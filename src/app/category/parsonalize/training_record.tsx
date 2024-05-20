// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import React, { useEffect, useState } from "react";
// import { MenuData } from "types/types";

// export default function ProgramTrainingRecord() {
//   const { data: session } = useSession();
//   const router = useRouter();
//   const [date, setDate] = useState<Date | undefined>(new Date());
//   const [menuData, setMenuData] = useState<MenuData[]>([]);

//   useEffect
//     (() => {
//     if(router.query.program) {
//       setDate(new Date(router.query.program as string));
//     }
//   })

//   return <div>record</div>;
// }

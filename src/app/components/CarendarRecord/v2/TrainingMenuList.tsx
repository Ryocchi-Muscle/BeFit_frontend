import React, { useState } from "react";
import TrainingMenuComponet from "./TrainingMenu";

interface MenuData {
  menuId: number;
  menuName: string;
}

export default function TrainingMenuList({ menus, setMenus }: { menus: MenuData[], setMenus: React.Dispatch<React.SetStateAction<MenuData[]>> }) {
  // const [menus, setMenus] = useState<MenuData[]>([]);

  const addMenu = () => {
    const newMenuId = menus.length > 0 ? menus[menus.length - 1].menuId + 1 : 1;
    setMenus([...menus, { menuId: newMenuId, menuName: "" }]);
    console.log("メニュー", menus);
  };

  const removeMenu = (menuId: number) => {
    setMenus((menus) => menus.filter((menu) => menu.menuId !== menuId));
  };

  return (
    <div>
      <div
        className="flex flex-col items-center justify-center overflow-auto"
        style={{ maxHeight: "calc(100% - 138px)" }}
      >
        {menus.map((menu) => (
          <TrainingMenuComponet
            key={menu.menuId}
            menuId={menu.menuId}
            menuName={menu.menuName}
            removeMenu={() => removeMenu(menu.menuId)}
          />
        ))}
        <button
          type="button"
          onClick={addMenu}
          className="my-4 p-2 bg-blue-500 text-white rounded"
        >
          新しいメニューを追加
        </button>
      </div>
    </div>
  );
}

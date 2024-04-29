import React, { useState } from "react";
import TrainingMenuComponet from "./TrainingMenu";
import { MenuData, TrainingSet } from "../../../../../types/types";

export default function TrainingMenuList({
  menus,
  setMenus,
}: {
  menus: MenuData[];
  setMenus: React.Dispatch<React.SetStateAction<MenuData[]>>;
}) {
  const addMenu = () => {
    const newMenuId = menus.length > 0 ? menus[menus.length - 1].menuId + 1 : 1;
    setMenus([...menus, { menuId: newMenuId, menuName: "", sets: [] }]);
    console.log("メニュー", menus);
  };

  const removeMenu = (menuId: number) => {
    setMenus((menus) => menus.filter((menu) => menu.menuId !== menuId));
  };

  // メニュー名を更新する関数
  const updateMenuName = (menuId: number, menuName: string) => {
    setMenus(
      menus.map((menu) =>
        menu.menuId === menuId ? { ...menu, menuName } : menu
      )
    );
  };

  // setを更新する関数
  const updateSetsInMenu = (menuId: number, newSets: TrainingSet[]) => {
    setMenus(
      menus.map((menu) =>
        menu.menuId === menuId ? { ...menu, sets: newSets } : menu
      )
    );
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
            sets={menu.sets}
            updateMenuName={updateMenuName}
            updateSetInMenu={updateSetsInMenu}
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

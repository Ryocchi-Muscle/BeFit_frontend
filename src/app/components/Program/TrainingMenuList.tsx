import React from "react";
import TrainingMenuComponet from "@/app/components/Program/TrainingMenu";
import { MenuData, TrainingSet } from "types/types";

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
  console.log("All menus data:", menus);
  menus.forEach((menu) => {
    console.log(`Menu ID: ${menu.menuId}, Sets:`, menu.sets);
  });
  const removeMenu = (menuId: number) => {
    console.log("Menus before removal:", menus);
    // メニューを削除
    const filteredMenus = menus.filter((menu) => menu.menuId !== menuId);
    // 削除後のメニューで menuId を再割り当て
    const renumberedMenus = filteredMenus.map((menu, index) => ({
      ...menu,
      menuId: index + 1, // menuId を 1 から連番に
      sets: menu.sets.map((set, setIndex) => ({ ...set, setId: setIndex + 1 })), // 必要に応じて set の ID も更新
    }));
    setMenus(renumberedMenus);
    console.log("Menus after removal:", renumberedMenus);
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

  const removeOrdinal = (menuName: string) => {
    return menuName.replace(/^\d+\.\s*/, ""); // 序数とそれに続く空白を削除
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
            menuName={removeOrdinal(menu.menuName)}
            sets={menu.sets}
            updateMenuName={updateMenuName}
            updateSetInMenu={updateSetsInMenu}
            removeMenu={() => removeMenu(menu.menuId)}
          />
        ))}
        {/* <button
          type="button"
          onClick={addMenu}
          className="my-4 p-2 bg-blue-500 text-white rounded"
        >
          メニュー追加
        </button> */}
      </div>
    </div>
  );
}

"use client";
import { Listbox } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import React from "react";
import { BodyPart } from "../../../../../types/types";

interface Props {
  bodyParts: BodyPart[];
  selectedBodyPart: string | null;
  onBodyPartSelect: (bodyPart: string) => void;
}

const MyComboBox: React.FC<Props> = ({
  bodyParts,
  selectedBodyPart,
  onBodyPartSelect,
}) => {
  const [selected, setSelected] = useState<BodyPart>(
    bodyParts.find((bp) => bp.name === selectedBodyPart) || bodyParts[0]
  );

  const handleChange = (part: BodyPart) => {
    setSelected(part);
    onBodyPartSelect(part.name);
  };

  return (
    <div className="w-20">
      <Listbox value={selected} onChange={handleChange}>
        {({ open }) => (
          <Fragment>
            <Listbox.Button className="relative w-full p-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 sm:text-sm">
              <span className="block truncate">{selected.name}</span>
              <ChevronUpDownIcon
                className="w-5 h-5 absolute right-2 top-2"
                aria-hidden="true"
              />
            </Listbox.Button>
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {bodyParts.map((part) => (
                <Listbox.Option
                  key={part.id}
                  value={part}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {part.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Fragment>
        )}
      </Listbox>
    </div>
  );
};

export default MyComboBox;

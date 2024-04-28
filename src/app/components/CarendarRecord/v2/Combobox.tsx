import { Listbox } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import React from "react";

const body_part = [
  { id: 1, name: "胸" },
  { id: 2, name: "背中" },
  { id: 3, name: "肩" },
  { id: 4, name: "腕" },
  { id: 5, name: "脚" },
];



function MyComboBox() {
  const [selectedPerson, setSelectedPerson] = React.useState(body_part[0]);

  return (
    <div className="w-20">
      <Listbox value={selectedPerson} onChange={setSelectedPerson}>
        {({ open }) => (
          <Fragment>
            <Listbox.Button className="relative w-full p-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 sm:text-sm">
              <span className="block truncate">{selectedPerson.name}</span>
              <ChevronUpDownIcon
                className="w-5 h-5 absolute right-2 top-2"
                aria-hidden="true"
              />
            </Listbox.Button>
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {body_part.map((person) => (
                <Listbox.Option
                  key={person.id}
                  value={person}
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
                        {person.name}
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
}

export default MyComboBox;

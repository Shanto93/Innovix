import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

const FAQ = () => {
  const faqs = [
    {
      question: "What types of mobiles do you sell?",
      answer:
        "We sell a wide range of mobiles, including flagship smartphones, budget-friendly options, and the latest models from top brands.",
    },
    {
      question: "Do you provide any warranty on mobile phones?",
      answer:
        "Yes, all our mobiles come with a manufacturer warranty. We also offer extended warranty options for added peace of mind.",
    },
    {
      question: "Can I trade in my old mobile phone?",
      answer:
        "Absolutely! We offer a trade-in program where you can exchange your old device for a discount on a new purchase.",
    },
  ];

  return (
    <div className="w-3/4 mx-auto py-8">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <Disclosure.Button className="flex justify-between items-center w-full text-lg font-medium text-[#FFD700]">
                  <span>{faq.question}</span>
                  <ChevronUpIcon
                    className={`w-6 h-6 transform ${
                      open ? "rotate-180" : ""
                    } text-[#FFD700]`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="mt-2 text-gray-200">
                  {faq.answer}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
};

export default FAQ;

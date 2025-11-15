"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function MenuOffline() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Images Grid */}
      <div className="fixed inset-0 z-0">
        <div className="grid grid-cols-5 grid-rows-4 h-full w-full opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
              className="relative overflow-hidden"
            >
              <img
                src="/dessy.jpg"
                alt=""
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-amber-500/20" />
            </motion.div>
          ))}
        </div>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      </div>

      {/* Floating particles effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(15)].map((_, i) => {
          // Generate random percentages for initial and animated positions
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          const x1 = Math.random() * 100;
          const y1 = Math.random() * 100;
          const x2 = Math.random() * 100;
          const y2 = Math.random() * 100;
          const x3 = Math.random() * 100;
          const y3 = Math.random() * 100;

          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-2 h-2 bg-orange-500/30 rounded-full"
              style={{
                left: `${startX}%`,
                top: `${startY}%`,
              }}
              animate={{
                left: [`${x1}%`, `${x2}%`, `${x3}%`],
                top: [`${y1}%`, `${y2}%`, `${y3}%`],
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Offline Banner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-4 mb-8"
          >
            <p className="text-yellow-300 text-center font-medium">
              📡 Go online to check what's cooking today!
            </p>
          </motion.div>

          {/* Title with animated glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <motion.h1
              animate={{
                textShadow: [
                  "0 0 20px rgba(251, 146, 60, 0.5)",
                  "0 0 40px rgba(251, 146, 60, 0.8)",
                  "0 0 20px rgba(251, 146, 60, 0.5)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400"
            >
              Dessy 69 Menu
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 mt-3 text-lg"
            >
              Mysuru's Finest Culinary Experience
            </motion.p>
          </motion.div>

          {/* Menu Sections */}
          <MenuSection
            title="🍢 Starters"
            delay={0.1}
            items={[
              {
                name: "Spring Rolls",
                description:
                  "Crispy vegetable spring rolls with sweet chili sauce",
                price: "₹199",
              },
              {
                name: "Garlic Bread",
                description: "Toasted bread with garlic butter and herbs",
                price: "₹149",
              },
              {
                name: "Soup of the Day",
                description: "Ask your server for today's special",
                price: "₹179",
              },
            ]}
          />

          <MenuSection
            title="🍛 Main Course"
            delay={0.2}
            items={[
              {
                name: "Grilled Chicken",
                description:
                  "Marinated chicken breast with seasonal vegetables",
                price: "₹399",
              },
              {
                name: "Pasta Carbonara",
                description: "Creamy pasta with bacon and parmesan",
                price: "₹349",
              },
              {
                name: "Vegetarian Pizza",
                description: "Wood-fired pizza with fresh vegetables",
                price: "₹379",
              },
              {
                name: "Fish & Chips",
                description: "Beer-battered fish with crispy fries",
                price: "₹429",
              },
            ]}
          />

          <MenuSection
            title="🍰 Desserts"
            delay={0.3}
            items={[
              {
                name: "Chocolate Cake",
                description: "Rich chocolate cake with vanilla ice cream",
                price: "₹219",
              },
              {
                name: "Ice Cream",
                description: "Three scoops of your choice",
                price: "₹179",
              },
            ]}
          />

          <MenuSection
            title="🥤 Beverages"
            delay={0.4}
            items={[
              {
                name: "Soft Drinks",
                description: "Coke, Sprite, Fanta",
                price: "₹79",
              },
              {
                name: "Fresh Juice",
                description: "Orange, Apple, Pineapple",
                price: "₹129",
              },
              {
                name: "Coffee/Tea",
                description: "Hot or iced",
                price: "₹99",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function MenuSection({
  title,
  items,
  delay,
}: {
  title: string;
  items: Array<{ name: string; description: string; price: string }>;
  delay: number;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="mb-12"
    >
      <motion.h2
        whileHover={{ scale: 1.02, x: 10 }}
        className="text-3xl font-bold text-orange-400 mb-6 pb-3 border-b-2 border-orange-500/30"
      >
        {title}
      </motion.h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <MenuItem
            key={index}
            name={item.name}
            description={item.description}
            price={item.price}
            index={index}
          />
        ))}
      </div>
    </motion.section>
  );
}

function MenuItem({
  name,
  description,
  price,
  index,
}: {
  name: string;
  description: string;
  price: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{
        scale: 1.03,
        x: 10,
        transition: { duration: 0.2 },
      }}
      className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-md p-5 rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 shadow-lg hover:shadow-orange-500/20"
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <motion.h3
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.1 }}
            className="text-xl font-bold text-white mb-2"
          >
            {name}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="text-gray-400 text-sm leading-relaxed"
          >
            {description}
          </motion.p>
        </div>
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: index * 0.1 + 0.2,
            type: "spring",
            stiffness: 200,
          }}
          whileHover={{
            scale: 1.1,
            rotate: 5,
          }}
          className="flex-shrink-0 bg-gradient-to-br from-orange-500 to-amber-600 text-white font-bold text-lg px-4 py-2 rounded-lg shadow-lg"
        >
          {price}
        </motion.div>
      </div>
    </motion.div>
  );
}

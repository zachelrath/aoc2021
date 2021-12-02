(ns day1-part1.core)

(defn compare-vec-el [el]
  (let [[a b] el]
    (< a b)))

(defn -main
  [& args]
  (with-open [rdr (clojure.java.io/reader "input.txt")]
    (let
      ;; Read file into a vector of ints
      [x (into [] (map #(Integer/parseInt %) (line-seq rdr)))
       ;; Create a separate vector which is offset from the original by one index
       y (conj (into [] (rest x)) (peek x))
       ;; Iterate over both vectors and map their elements into a tuple
       ;; of [previous, current]
       z (doall (map #(vector %1 %2) x y))]
      ;; Filter out the tuples where previous < current, and count them
      (println (count (filter compare-vec-el z))))))

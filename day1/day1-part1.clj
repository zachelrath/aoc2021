(ns day1-part1.core)

(defn -main
  [& args]
  (with-open [rdr (clojure.java.io/reader "input.txt")]
    (let
      ;; Read file into a vector of ints
      [x (into [] (map #(Integer/parseInt %) (line-seq rdr)))]
      ;; Count items where current is greater than previous
      (println (count (filter identity (map > (rest x) x)))))))

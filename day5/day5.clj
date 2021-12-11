(require '[clojure.string :as str])

(defn parse-int [input]
  (Integer/parseInt input))

(defn to-parse-line-segment [input]
  ;; Input: "x1,y1 -> x2,y2" e.g. 4,5 -> 7,5
  (map #(map parse-int (str/split % #",")) (str/split input #" -> ")))

(defn only-horizontal-or-vertical [input]
  (let [[[x1 y1] [x2 y2]] input]
    (or (= x1 x2) (= y1 y2))))

(defn abs [n] (max n (- n)))

(defn is-diagonal [x1 x2 y1 y2]
  (= (abs (- y2 y1)) (abs (- x2 x1))))

(defn only-horizontal-or-vertical-or-diagonal [input]
  (let [[[x1 y1] [x2 y2]] input]
    (or (= x1 x2) (= y1 y2) (is-diagonal x1 x2 y1 y2))))

(defn safe-range [a b]
  (if (> a b) (range a (dec b) -1) (range a (inc b))))

(defn get-points-in-segment [input]
  (let [[[x1 y1] [x2 y2]] input]
    (cond  (= x1 x2) (map #(str "(" x1 "," % ")") (safe-range y1 y2))
           (= y1 y2) (map #(str "(" % "," y1 ")") (safe-range x1 x2))
           :else     (map #(str "(" %1 "," %2 ")") (safe-range x1 x2) (safe-range y1 y2))))

  )

(defn filter-map-vals
  [pred m]
  (filter (fn [[k v]] (pred v)) m))

(defn increment-key [atm key]
  (if-let [current (@atm key)]
    (swap! atm update key inc)
    (swap! atm assoc key 1))
  atm)

(defn part1
  [input]
  (with-open [rdr (clojure.java.io/reader input)]
    (let
      ;; Grab the horizontal / vertical line segments from the input
      [segments (filter only-horizontal-or-vertical
                        (map to-parse-line-segment
                             (line-seq rdr)))
       ;; Extract strings representing the points in the segment,
       ;; e.g. "(1,9)" "(2,9)" "(3,9)" would be the "points" in the segment
       points-in-segments (flatten (map get-points-in-segment segments))
       ;; Atomically build a map whose keys are points and values are an integer count
       ;; of the times that a point was crossed by a line segment
       results (reduce #(increment-key %1 %2) (atom {}) points-in-segments)]
      (println "Part 1: points visited 2+ times:" (count (filter-map-vals #(>= % 2) @results))))
    ))

(defn part2
  [input]
  (with-open [rdr (clojure.java.io/reader input)]
    (let
      ;; Extract all horizontal/vertical/45-degree diagonal segments
      [segments (filter only-horizontal-or-vertical-or-diagonal
                        (map to-parse-line-segment
                             (line-seq rdr)))
       ;; Extract strings representing the points in the segment,
       ;; e.g. "(1,9)" "(2,9)" "(3,9)" would be the "points" in the segment
       points-in-segments (flatten (map get-points-in-segment segments))
       ;; Atomically build a map whose keys are points and values are an integer count
       ;; of the times that a point was crossed by a line segment
       results (reduce #(increment-key %1 %2) (atom {}) points-in-segments)]
      (println "Part 2: points visited 2+ times:" (count (filter-map-vals #(>= % 2) @results))))
    ))

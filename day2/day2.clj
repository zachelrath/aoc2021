
(require '[clojure.string :as str])

(defn parse-cmd [input]
  (let [[cmd value] (str/split input #" ")]
    ;; Parse command into a tuple of command and integer value
    (vector cmd (Long/parseLong value))
    ))

(defn val-matches [target-cmd cmds]
  (map second (filter #(= target-cmd (first %)) cmds)))

(defn sum [x] (reduce + x))

(defn day2part1
  [file]
  (with-open [rdr (clojure.java.io/reader file)]
    (let
      ;; Parse command input into vector
      [cmds (map parse-cmd (line-seq rdr))
       forwards (val-matches "forward" cmds)
       downs (val-matches "down" cmds)
       ups (map unchecked-negate-int (val-matches "up" cmds))
       final_depth (+ (sum ups) (sum downs))
       final_horizontal (sum forwards)
       ]
      (println "horizontal" final_horizontal
               "vertical" final_depth
               "part1" (* final_depth final_horizontal))
      )))

(defn run-cmd [acc curr]
  (let [[cmd val] curr
    [x y aim] acc]
 (case cmd "up" (vector x y (- aim val))
           "down" (vector x y (+ aim val))
           "forward" (vector (+ val x) (+ y (* val aim)) aim))
))

(defn day2part2
  [file]
  (with-open [rdr (clojure.java.io/reader file)]
    (let
      ;; Parse command input into vector
      [cmds (map parse-cmd (line-seq rdr))
       ;; Apply the commands to an initial position
       [horizontal depth] (reduce run-cmd [0 0 0] cmds)]
      (println "horizontal" horizontal
               "vertical" depth
               "part2" (* horizontal depth))
      )))

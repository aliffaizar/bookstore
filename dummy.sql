USE bookstore;

INSERT INTO author (name, biography)
VALUES
  ('Dan Brown', 'Dan Brown is the author of numerous #1 bestselling novels, including The Da Vinci Code, which has become one of the best selling novels of all time as well as the subject of intellectual debate among readers and scholars. Brown’s novels are published in 56 languages around the world with over 200 million copies in print.'),
  ('J. K. Rowling', "Joanne Rowling, who goes by the pen name J.K. Rowling, is a British author and screenwriter best known for her seven-book Harry Potter children's book series. The series has sold more than 450 million copies and was adapted into a blockbuster film franchise."),
  ('Jostein Gaarder', "Jostein Gaarder is a Norwegian intellectual and author of several novels, short stories and children's books. Gaarder often writes from the perspective of children, exploring their sense of wonder about the world. He often uses metafiction in his works, writing stories within stories."),
  ('Noam Chomsky', "Avram Noam Chomsky is an American linguist, philosopher, cognitive scientist, historian, social critic, and political activist. Sometimes called the 'father of modern linguistics', Chomsky is also a major figure in analytic philosophy and one of the founders of the field of cognitive science. He is Laureate Professor of Linguistics at the University of Arizona and Institute Professor Emeritus at the Massachusetts Institute of Technology (MIT), and is the author of more than 100 books on topics such as linguistics, war, politics, and mass media. Ideologically, he aligns with anarcho-syndicalism and libertarian socialism."),
  ('Stephen Hawking', "Stephen William Hawking CH CBE FRS FRSA was an English theoretical physicist, cosmologist, and author who was director of research at the Centre for Theoretical Cosmology at the University of Cambridge at the time of his death. He was the Lucasian Professor of Mathematics at the University of Cambridge between 1979 and 2009. His scientific works included a collaboration with Roger Penrose on gravitational singularity theorems in the framework of general relativity and the theoretical prediction that black holes emit radiation, often called Hawking radiation. Hawking was the first to set out a theory of cosmology explained by a union of the general theory of relativity and quantum mechanics. He was a vigorous supporter of the many-worlds interpretation of quantum mechanics."),
  ('Stephen King', "Stephen Edwin King is an American author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels. His books have sold more than 350 million copies, and many have been adapted into films, television series, miniseries, and comic books. King has published 61 novels, including seven under the pen name Richard Bachman, and five non-fiction books. He has also written approximately 200 short stories, most of which have been published in book collections."),
  ('Franz Kafka', "Franz Kafka was a German-speaking Bohemian novelist and short-story writer, widely regarded as one of the major figures of 20th-century literature. His work fuses elements of realism and the fantastic. It typically features isolated protagonists facing bizarre or surrealistic predicaments and incomprehensible socio-bureaucratic powers, and has been interpreted as exploring themes of alienation, existential anxiety, guilt, and absurdity. His best known works include 'Die Verwandlung' ('The Metamorphosis'), Der Process (The Trial), and Das Schloss (The Castle). The term Kafkaesque has entered the English language to describe situations like those found in his writing."),
  ('George Orwell', "Eric Arthur Blair, known by his pen name George Orwell, was an English novelist, essayist, journalist and critic. His work is characterised by lucid prose, biting social criticism, opposition to totalitarianism, and outspoken support of democratic socialism."),
  ('J. R. R. Tolkien', "John Ronald Reuel Tolkien CBE FRSL was an English writer, poet, philologist, and academic. He was the author of the high fantasy works The Hobbit and The Lord of the Rings."),
  ('J. D. Salinger', "Jerome David Salinger was an American writer best known for his 1951 novel The Catcher in the Rye. Salinger published several short stories in Story magazine in the early 1940s before serving in World War II. In 1948, his critically acclaimed story 'A Perfect Day for Bananafish' appeared in The New Yorker, which became home to much of his later work. In 1951, his novel The Catcher in the Rye was a popular success. His depiction of adolescent alienation and loss of innocence in the protagonist Holden Caulfield was influential, especially among adolescent readers. The novel remains widely read and controversial, selling around 250,000 copies a year."),
  ('Leo Tolstoy', "Count Lev Nikolayevich Tolstoy, usually referred to in English as Leo Tolstoy, was a Russian writer who is regarded as one of the greatest authors of all time. He received multiple nominations for Nobel Prize in Literature every year from 1902 to 1906 and nominations for Nobel Peace Prize in 1901, 1902 and 1910, and his miss of the prize is a major Nobel prize controversy.");

INSERT INTO category (name)
VALUES ('Fiction'), ('Non-fiction'), ('Science'), ('Fantasy'), ('Horror'), ('Thriller'), ('Mystery'), ('Biography'), ('History'), ('Philosophy');

INSERT INTO publisher (name)
VALUES ('Penguin Random House'), ('HarperCollins'), ('Simon & Schuster'), ('Hachette Livre'), ('Macmillan Publishers'), ('Holtzbrinck Publishing Group'), ('Scholastic'), ('Cengage Learning'), ('McGraw-Hill Education');

INSERT INTO book (title, description, pages, price, publishedYear, image, authorId, publisherId, categoryId)
VALUES 
  (
    "Harry Potter and the Philosopher's Stone",
    "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry. Harry makes close friends and a few enemies during his first year at the school, and with the help of his friends, Harry faces an attempted comeback by the dark wizard Lord Voldemort, who killed Harry's parents, but failed to kill Harry when he was just 15 months old.",
    223,
    10.99,
    1997,
    "https://images-na.ssl-images-amazon.com/images/I/51UoqRAxwEL._SX331_BO1,204,203,200_.jpg",
    2,
    1,
    4
  ),
  (
    "Shophie's World",
    "Sophie's World is a 1991 novel by Norwegian writer Jostein Gaarder. It follows Sophie Amundsen, a Norwegian teenager who is introduced to the history of philosophy by Alberto Knox, a middle-aged philosopher. Sophie's World became a best-seller in Norway and won the Deutscher Jugendliteraturpreis in 1994. The English version of the novel was published in 1995, and the book was reported to be the best-selling book in the world in that year.",
    403,
    12.99,
    1991,
    "https://images-na.ssl-images-amazon.com/images/I/51Q5ZQ%2BZjSL._SX331_BO1,204,203,200_.jpg",
    3,
    2,
    4
  ),
  (
    "The Metamorphosis",
    "The Metamorphosis is a novella written by Franz Kafka which was first published in 1915. One of Kafka's best-known works, The Metamorphosis tells the story of salesman Gregor Samsa who wakes one morning to find himself inexplicably transformed into a huge insect (German ungeheures Ungeziefer, literally 'monstrous vermin'), subsequently struggling to adjust to this new condition. The novella has been widely discussed among literary critics, with differing interpretations being offered.",
    55,
    5.99,
    1915,
    "https://images-na.ssl-images-amazon.com/images/I/51Q5ZQ%2BZjSL._SX331_BO1,204,203,200_.jpg",
    7,
    3,
    1
  ),
  (
    "The Catcher in the Rye",
    "The Catcher in the Rye is a story by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adults but is often read by adolescents for its themes of angst, alienation, and as a critique on superficiality in society. It has been translated widely. Around 1 million copies are sold each year, with total sales of more than 65 million books. The novel's protagonist Holden Caulfield has become an icon for teenage rebellion. The novel also deals with complex issues of innocence, identity, belonging, loss, and connection.",
    234,
    9.99,
    1951,
    "https://images-na.ssl-images-amazon.com/images/I/51Q5ZQ%2BZjSL._SX331_BO1,204,203,200_.jpg",
    10,
    5,
    1
  ),
  (
    "The Lord of the Rings",
    "The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit, but eventually developed into a much larger work. Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling novels ever written, with over 150 million copies sold.",
    1216,
    29.99,
    1954,
    "https://images-na.ssl-images-amazon.com/images/I/51Q5ZQ%2BZjSL._SX331_BO1,204,203,200_.jpg",
    9,
    6,
    4
  );


INSERT INTO user (name, email, password, role)
VALUES
  ("John Doe", "johndoe@mail.com", "123456", "user"),
  ("Jane Doe", "jane@mail.com", "123456", "user"),
  ("David Doe", "david@mail.con", "123456", "user"),
  ("Robert Doe", "robert@mail.com", "123456", "user");
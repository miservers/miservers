# XO Game For My Son

from tkinter import *

# Create Root window
root = Tk()

root.title("XO Game")

e = Entry(root, width=20, fg='blue',
							font=('Arial',16,'bold'))
e.grid(row=0, column=0)
e.insert(END, "X")

e = Entry(root, width=20, fg='blue',
							font=('Arial',16,'bold'))
e.grid(row=0, column=1)
e.insert(END, "O")



root.mainloop()


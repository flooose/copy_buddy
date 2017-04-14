images = img/copy-buddy-128.png\
	img/copy-buddy-48.png\
	img/copy-buddy-16.png\
	img/drawing-1.png

source_files = src/popup.css src/popup.js src/manifest.json  src/popup.html

build : $(images) $(source_files)
	cp $(images) copy_buddy/
	cp $(source_files) copy_buddy/

release : build
	zip -r copy_buddy.zip copy_buddy/

clean :
	rm copy_buddy/*

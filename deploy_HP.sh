# push for repository
git add .
msg="Update: `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"
git push -f origin master

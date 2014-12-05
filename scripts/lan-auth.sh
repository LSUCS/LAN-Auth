#!/bin/sh

# Add a user's IP address to the EdgeOS Firewall
# e.g. ./lan-auth.sh 48 oliverw92 192.168.0.82


################
# START CONFIG #

RULE_DURATION_DAYS=4
AUTH_RULESET=LAN_AUTH

#  END CONFIG  # 
################

# Execute commands without running configure
run=/opt/vyatta/sbin/vyatta-cfg-cmd-wrapper

# Go into config mode
$run begin

# Get last rule number, set new rule number
LAST_RULE=$($run show firewall name $AUTH_RULESET | grep -o 'rule [0-9]\+ {' | tail -n 1 | grep -o '[0-9]\+')
NEXT_RULE=$(($LAST_RULE+1))

# Configure rule
edit_rule="$run set firewall name $AUTH_RULESET rule $NEXT_RULE"
$edit_rule action accept
$edit_rule description "$1 - $2"
$edit_rule log disable
$edit_rule protocol all
$edit_rule source address $3

# Work out start/end times
STOP_EPOCH=$((`date +%s` + $RULE_DURATION_DAYS * 24 * 60 * 60))
START_DATE=$(date +"%Y-%m-%d")
TIME=$(date +"%H:%M:%S")
STOP_DATE=$(date -D '%s' +%Y-%m-%d -d $STOP_EPOCH)

# Set start/end times
edit_time="$edit_rule time"
$edit_time startdate $START_DATE
$edit_time stopdate $START_DATE
$edit_time starttime $TIME
$edit_time stoptime $TIME

# Commit
$run commit
$run end